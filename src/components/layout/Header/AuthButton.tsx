import { useAuth } from "hooks/Auth";
import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import Login from "components/login";

const AuthButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <>
        <Button colorScheme="cyan" bg="transparent" color="white" border="1px" onClick={onOpen}>
          Fazer login
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW={[300, 350, 450]}>
            <Login />
          </ModalContent>
        </Modal>
      </>
    );
  }

  return <Spinner height={10} width={10} marginEnd="3.5em" />;
};

export default AuthButton;
