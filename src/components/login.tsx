import React, { useCallback, useEffect, useState } from "react";
import { Flex, Progress, Center, Heading, Divider, Box, Spinner, Button } from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Formik, Form, FormikHelpers } from "formik";
import { validateEmail, validatePassword } from "utils/validation";
import firebase, { auth } from "utils/firebase";
import Input from "components/Input";
import { useAuth } from "hooks/Auth";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { GoogleIcon } from "helper/icon";

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
    HandleOnClickLoginWithProvider(new firebase.auth.GoogleAuthProvider());
  }, []);

  return { isLoading, handleSubmit, handleGoogleOnClick };
};

const Login: React.FC = () => {
  const { isLoading, handleSubmit, handleGoogleOnClick } = useLogic();

  return (
    <Flex gridArea="form">
      <Box bg="gray.600" borderRadius="5px" padding="40px" width="100%" height="100%" margin="auto">
        <Box display={isLoading ? "" : "none"}>
          <Progress size="xs" isIndeterminate />
          <Divider marginY={2} opacity={0} />
        </Box>

        <Box opacity={isLoading ? 0.5 : 1}>
          <Heading size="md" lineHeight="shorter" color="gray.100">
            Faça seu login na plataforma
          </Heading>

          <Divider marginY={3} opacity={0} />

          <Formik initialValues={loginInitialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <Input
                  name="email"
                  icon={<EmailIcon color="gray.400" />}
                  validation={validateEmail}
                  id="email"
                  placeholder="email"
                  disabled={isLoading}
                  autoComplete="email"
                />

                <Divider marginY={2} opacity={0} />

                <Input
                  name="password"
                  icon={<LockIcon color="gray.400" />}
                  validation={validatePassword}
                  type="password"
                  id="password"
                  placeholder="senha"
                  autoComplete="current-password"
                  disabled={isLoading}
                />

                <Center>
                  <Button
                    mt={4}
                    colorScheme="whatsapp"
                    isLoading={isSubmitting}
                    type="submit"
                    disabled={isLoading}
                    width="100%"
                  >
                    Logar
                  </Button>
                </Center>
              </Form>
            )}
          </Formik>
        </Box>
        <Box display="flex" marginY={2}>
          <Divider marginY="auto" marginEnd={2} />
          ou
          <Divider marginY="auto" marginStart={2} />
        </Box>
        <Center>
          <Button
            bgColor="white"
            color="black"
            type="submit"
            disabled={isLoading}
            onClick={handleGoogleOnClick}
          >
            <GoogleIcon marginEnd={2} /> Login com Google
          </Button>
        </Center>
      </Box>
    </Flex>
  );
};

export default Login;
