import { InputLeftElement, Input, FormErrorMessage, InputProps, FormControl, InputGroup, ComponentWithAs, IconProps } from "@chakra-ui/react"
import { Field } from 'formik';
import React from "react";

interface Props extends InputProps {
    icon: React.ReactNode;
    validation?(value: string): string | undefined;
    name: string;
    disabled: boolean;
}

const SomeImage = ({ validation, icon, name,...rest }: Props) => {
  return (
    <Field name={name} validate={validation}>
        {({ field, form }: {field: InputProps, form: any }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <InputGroup>
            <InputLeftElement
                pointerEvents="none"
            >
                {icon}
            </InputLeftElement>
            <Input {...field} {...rest} />
            </InputGroup>
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
        )}
    </Field>
  );
};

export default SomeImage;
