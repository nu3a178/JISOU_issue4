import { Button, type ButtonProps } from "@chakra-ui/react";

export const SecondaryButton = (
  props: Omit<ButtonProps, "bg" | "border" | "shadow">,
) => {
  const { children } = props;
  return (
    <Button
      bg="gray.500"
      border="1px solid #ccc"
      shadow="sm"
      {...props}
      _hover={{ opacity: 0.8 }}
    >
      {children}
    </Button>
  );
};
