import { Box, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box borderBottom={"0.5px solid gray"} w={"100%"}>
      <Text>Movies</Text>
      <Text>TV Shows</Text>

    </Box>
  );
}