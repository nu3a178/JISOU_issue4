import { Input, type InputProps } from "@chakra-ui/react";

export const CardInput = (props: InputProps) => {
  const { children } = props;
  return (
    <Input border="1px solid #aaa" shadow="sm" {...props}>
      {children}
    </Input>
  );
};
