import { Center } from "@chakra-ui/layout";
import {
  InputLeftElement,
  Input,
  FormErrorMessage,
  InputProps,
  FormControl,
  InputGroup,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { Field, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { useIsMounted } from "react-tidy";

interface Props extends InputProps {
  icon: React.ReactNode;
  validation?(value: string): string | undefined;
  name: string;
  disabled: boolean;
}

interface FieldFormProps {
  field: InputProps;
  form: FormikProps<{ [name: string]: string }>;
}

const SomeImage: React.FC<Props> = ({ validation, icon, name, ...rest }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const mounted = useIsMounted();

  // Timeout to prevent error when rendering component
  // Associated to FormControl, Input and Modal from Chakra ui
  useEffect(() => {
    new Promise(r => setTimeout(r, 10)).then(() => {
      mounted() && setIsLoading(false);
    });
  }, [setIsLoading]);

  return (
    <Field name={name} validate={validation}>
      {({ field, form }: FieldFormProps) => (
        <FormControl isInvalid={!!(form.errors[name] && form.touched[name])}>
          {isLoading ? (
            <Center>
              <Spinner height={10} width={10} />
            </Center>
          ) : (
            <>
              <InputGroup>
                <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
                <Input {...field} {...rest} />
              </InputGroup>
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            </>
          )}
        </FormControl>
      )}
    </Field>
  );
};

export default SomeImage;
