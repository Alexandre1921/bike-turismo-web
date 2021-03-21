import React, { useState } from "react";
import { Flex, Progress, Center, Heading, Divider, Grid, Box,FormControl, FormLabel, FormHelperText,InputGroup,InputLeftElement, Input, FormErrorMessage, InputProps, Button } from "@chakra-ui/react"
import { EmailIcon, LockIcon } from "@chakra-ui/icons"
import { Formik, Field, Form } from 'formik';

const Home = () => {
  const [ isLoading, setIsLoading ] = useState(false);

  function validateEmail(value: string) {
    const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let error;
    if (!value) {
      error = "O email é necessário"
    } else if (!exp.test(value)) {
      error = "Email inválido"
    }
    return error;
  }

  function validatePassword(value: string) {
    const exp = /(?=.*[0-9a-zA-Z]).{6,}/;
    let error
    if (!value) {
      error = "A senha é necessária"
    } else if (!exp.test(value)) {
      error = "Senha inválida"
    }
    return error
  }

  return (
      <Grid 
        as="main"
        templateColumns="1fr 400px 1fr"
        templateRows="1fr 100% 1fr"
        templateAreas="
          '. . .'
          '. form .'
          '. . .'
        "
        justifyContent="center"
        alignItems="center"
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
                onSubmit={(values, actions) => {
                  setIsLoading(true);
                  console.log(values);
                  actions.setSubmitting(false);
                }}
              >
                {({isSubmitting}) => (
                  <Form>
                    <Field name="email" validate={validateEmail}>
                      {({ field, form }: {field: InputProps, form: any }) => (
                        <FormControl isInvalid={form.errors['email'] && form.touched['email']}>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                            >
                              <EmailIcon color="gray.400" />
                            </InputLeftElement>
                            <Input {...field} id="email" placeholder="email" disabled={isLoading} />
                          </InputGroup>
                          {form.errors['email'] ? <FormErrorMessage>{form.errors['email']}</FormErrorMessage> : <FormHelperText>Nós nunca vamos compartilhar seu email.</FormHelperText>}
                        </FormControl>
                      )}
                    </Field>

                    <Divider marginY={2} opacity={0}/>

                    <Field name="password" validate={validatePassword}>
                      {({ field, form }: {field: InputProps, form: any }) => (
                        <FormControl isInvalid={form.errors['password'] && form.touched['password']}>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                            >
                              <LockIcon color="gray.400" />
                            </InputLeftElement>
                            <Input {...field} type="password" id="password" placeholder="senha" autoComplete="current-password" disabled={isLoading} />
                          </InputGroup>
                          <FormErrorMessage>{form.errors['password']}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

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
  );
};

export default Home;
