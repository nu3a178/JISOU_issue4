import { Box } from "@chakra-ui/react";

export const Layout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <Box minH="100vh" w="100vw" bg="gray.100">
      {children}
    </Box>
  );
};
