import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Box backgroundColor='red.500' height={100} />
      <Box as='main' marginBottom={200}>
        <Container py={20}>{children}</Container>
      </Box>
      {/* <Box
        backgroundColor='orange.800'
        height={200}
        position='absolute'
        bottom={0}
        left={0}
        right={0}
        zIndex={0}
      /> */}
    </>
  );
}
