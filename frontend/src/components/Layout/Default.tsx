import { Box, HStack } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

type Props = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
  return (
    <>
      <HStack align={"start"} spacing={0}>
        <Box minW={"15rem"}>
          <Sidebar />
        </Box>
        <Box w={"100%"}>
          <Header />
          <Box as="main">{children}</Box>
        </Box>
      </HStack>
    </>
  );
}
