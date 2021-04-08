import {
  InputLeftElement,
  Input,
  FormErrorMessage,
  InputProps,
  FormControl,
  InputGroup,
} from "@chakra-ui/react";
import { Field, FormikProps } from "formik";
import React from "react";

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
  return (
    <Field name={name} validate={validation}>
      {({ field, form }: FieldFormProps) => (
        <FormControl isInvalid={!!(form.errors[name] && form.touched[name])}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
            <Input {...field} {...rest} />
          </InputGroup>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default SomeImage;
