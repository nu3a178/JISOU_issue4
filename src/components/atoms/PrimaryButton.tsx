import { Button, type ButtonProps } from "@chakra-ui/react";

export const PrimaryButton = (
  props: Omit<ButtonProps, "bg" | "border" | "shadow">,
) => {
  const { children } = props;
  return (
    <Button
      bg="teal"
      border="1px solid #aaa"
      shadow="sm"
      {...props}
      css={{ _hover: { opacity: 0.8 } }}
    >
      {children}
    </Button>
  );
};
