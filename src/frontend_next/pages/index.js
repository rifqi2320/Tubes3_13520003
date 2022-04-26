import { Flex, Image } from "@chakra-ui/react";
import Sidebar from "../components/sidebar/sidebar";

export default function Index() {
  return (
    <Flex w="100vw" h="100vh">
      <Sidebar open={[false, false, false]} />
      <Flex w="100%" bgImage={"url('https://c.tenor.com/n3dRjZoWEE8AAAAC/lag-train.gif')"} />
    </Flex>
  );
}
