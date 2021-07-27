import React from "react";
import { Flex, Progress, Center, Heading, Divider, Box, Button } from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Formik, Form } from "formik";
import { validateEmail, validatePassword } from "utils/validation";
import Input from "components/Input";
import { GoogleIcon } from "helper/icon";
import useLogic from "./logic";

const loginInitialValues = { email: "", password: "" };

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
