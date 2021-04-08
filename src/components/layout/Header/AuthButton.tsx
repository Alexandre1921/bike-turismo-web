import { useAuth } from "hooks/Auth";
import React from "react";
import Link from "next/link";
import { Button, Spinner } from "@chakra-ui/react";

const AuthButton: React.FC = () => {
  const { user, userDataPresent, signOut } = useAuth();

  if (userDataPresent) {
    if (!!user && !user?.isAnonymous) {
      return (
        <Button colorScheme="red" border="1px" onClick={signOut}>
          Encerrar sessão
        </Button>
      );
    }
    return (
      <Link href="/login">
        <Button colorScheme="cyan" bg="transparent" color="white" border="1px">
          Fazer login
        </Button>
      </Link>
    );
  }
  return <Spinner height={10} width={10} marginEnd="3.5em" />;
};

export default AuthButton;
