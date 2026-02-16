import { Textarea, type TextareaProps } from "@chakra-ui/react";

export const CardTextArea = (props: TextareaProps) => {
  const { children } = props;
  return (
    <Textarea border="1px solid #aaa" shadow="sm" {...props}>
      {children}
    </Textarea>
  );
};
