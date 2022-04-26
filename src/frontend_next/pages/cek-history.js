import { Flex, Image } from "@chakra-ui/react";
import Sidebar from "../components/sidebar/sidebar";

export default function Test() {
  return (
    <Flex w="100vw" h="100vh">
      <Sidebar open={[false, false, true]} />
      <Flex w="100%">
        <Image src="https://c.tenor.com/n3dRjZoWEE8AAAAC/lag-train.gif" objectFit={"cover"} />
      </Flex>
    </Flex>
  );
}
