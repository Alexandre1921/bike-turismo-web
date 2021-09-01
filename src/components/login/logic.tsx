import React, { useCallback, useEffect, useState } from "react";
import { FormikHelpers } from "formik";
import firebase, { auth } from "utils/firebase";
import { useAuth } from "hooks/Auth";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const loginInitialValues = { email: "", password: "" };
type ILoginValues = typeof loginInitialValues;

interface IuseLogicReturn {
  isLoading: boolean;
  handleGoogleOnClick(): void;
  handleSubmit: ({ email, password }: ILoginValues, actions: FormikHelpers<ILoginValues>) => void;
}

const useLogic = (): IuseLogicReturn => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { user, userDataPresent } = useAuth();

  useEffect(() => {
    if (!!user && userDataPresent && !user?.isAnonymous) {
      router.push("/");
    }
  }, [user, userDataPresent, router]);

  const HandleAuthError = useCallback((error: firebase.auth.AuthError) => {
    setIsLoading(false);
    switch (error.code) {
      case "auth/user-disabled":
        MySwal.fire({
          title: <strong>Não foi possível realizar login</strong>,
          icon: "error",
          html: <p>Usuário desativado</p>,
          focusConfirm: false,
          showConfirmButton: true,
        });
        break;
      case "auth/invalid-email":
        MySwal.fire({
          title: <strong>Não foi possível realizar login</strong>,
          icon: "error",
          html: <p>Cheque as seu email</p>,
          focusConfirm: false,
          showConfirmButton: true,
        });
        break;
      case "auth/wrong-password":
        MySwal.fire({
          title: <strong>Não foi possível realizar login</strong>,
          icon: "error",
          html: <p>Cheque as suas credenciais.</p>,
          focusConfirm: false,
          showConfirmButton: true,
        });
        break;
      case "auth/too-many-requests":
        MySwal.fire({
          title: <strong>Login desativado temporariamente</strong>,
          icon: "error",
          html: (
            <p>
              O login para esta conta foi desativado temporariamente pois foi feito tentativas
              repetitivas em um espaço curto tempo!
            </p>
          ),
          focusConfirm: false,
          showConfirmButton: true,
        });
        break;
      case "auth/user-not-found":
        MySwal.fire({
          title: <strong>Usuário não encontrado!</strong>,
          icon: "error",
          html: <p>Cheque as suas credenciais.</p>,
          focusConfirm: false,
          showConfirmButton: true,
        });
        break;
      case "auth/popup-closed-by-user":
        break;
      case "auth/cancelled-popup-request":
        break;
      default:
        console.log(error);
        MySwal.fire({
          title: <strong>Erro desconhecido</strong>,
          icon: "error",
          html: <p>Desculpe pelo transtorno, não foi possível realizar o seu login.</p>,
          focusConfirm: false,
          showConfirmButton: true,
        });
        break;
    }
  }, []);

  const HandleAuthSuccess = useCallback(() => {
    window.location.reload();
  }, []);

  const HandleAuthFinally = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleSubmit = useCallback(
    ({ email, password }, actions) => {
      setIsLoading(true);
      actions.setSubmitting(false);

      auth
        .signInWithEmailAndPassword(email, password)
        .then(HandleAuthSuccess)
        .catch(HandleAuthError)
        .finally(HandleAuthFinally);
    },
    [setIsLoading]
  );

  const HandleOnClickLoginWithProvider = useCallback(
    provider => {
      auth.signInWithPopup(provider).then(HandleAuthSuccess).catch(HandleAuthError);
    },
    [HandleAuthError]
  );

  const handleGoogleOnClick = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    HandleOnClickLoginWithProvider(provider);
  }, []);

  return { isLoading, handleSubmit, handleGoogleOnClick };
};

export default useLogic;
