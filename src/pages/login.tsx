import React, { useEffect, useState } from "react";
import { Flex, Progress, Center, Heading, Divider, Grid, Box, Spinner, Button } from "@chakra-ui/react"
import { EmailIcon, LockIcon } from "@chakra-ui/icons"
import { Formik, Field, Form } from 'formik';
import { validateEmail, validatePassword } from "utils/validation";
import { auth } from "utils/firebase";
import Input from "components/input";
import { useAuth } from "hooks/auth";
import { useRouter } from 'next/router';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Home = () => {
  const router = useRouter();

  const [ isLoading, setIsLoading ] = useState(false);

  const { user, userDataPresent } = useAuth();

  useEffect(() => {
    if (!!user && userDataPresent && !user?.isAnonymous) {
      router.push("/");
    }
  }, [user, userDataPresent]);

  return (!!user || !userDataPresent) ? <Center><Spinner size="xl" /></Center> :
  (
      <Center>
        <Grid
          width="100%"
          as="main"
          templateColumns="1fr 100% 1fr"
          templateRows="1fr 100% 1fr"
          templateAreas="
            '. . .'
            '. form .'
            '. . .'
          "
          justifyContent="center"
          alignItems="center"
          maxWidth={800}
          minW={400}
        >
          <Flex gridArea="form">
            <Box bg="gray.600" borderRadius="5px" padding="40px" width="100%" height="100%">
              <Box display={isLoading?"":"none"}>
                <Progress size="xs" isIndeterminate />
                <Divider marginY={2} opacity={0} />
              </Box>

              <Box opacity={isLoading?0.5:1}>
                <Heading size="md" lineHeight="shorter" color="gray.100">
                  Faça seu login na plataforma
                </Heading>

                <Divider marginY={3} opacity={0}/>

                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={({ email, password }, actions) => {
                    setIsLoading(true);
                    actions.setSubmitting(false);
                    auth.signInWithEmailAndPassword(email, password)
                    .then(() => window.location.reload())
                    .catch(() => {
                      MySwal.fire({
                        title: <strong>Erro ao realizar login</strong>,
                        icon: 'error',
                        html: <p>Cheque as suas credenciais</p>,
                        focusConfirm: false,
                        showConfirmButton: true,
                      })
                    })
                    .finally(() => setIsLoading(false));
                  }}
                >
                  {({isSubmitting}) => (
                    <Form>
                      <Input
                        name={"email"}
                        icon={<EmailIcon color="gray.400" />}
                        validation={validateEmail}
                        id="email"
                        placeholder="email"
                        disabled={isLoading}
                      />

                      <Divider marginY={2} opacity={0}/>

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
                        >
                          Logar
                        </Button>
                      </Center>
                    </Form>
                  )}
                </Formik>
              </Box>

              <Divider marginY={6} />
            </Box>
          </Flex>
        </Grid>
      </Center>
  );
};

export default Home;
