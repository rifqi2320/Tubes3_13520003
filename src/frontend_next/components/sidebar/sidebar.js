import { Box, Button, Flex, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";

function SidebarButton({ children, buttonName, href, ...props }) {
  return (
    <VStack w="100%" h={props.isOpen ? "100%" : "40%"} bg={"gray.600"} borderRadius={"xl"}>
      <Button
        border="1px solid lightgray"
        as={Link}
        w="100%"
        h={props.isOpen ? "30%" : "100%"}
        href={props.isOpen ? "/" : href}
      >
        <Text fontSize="3xl">{buttonName}</Text>
      </Button>
      <Flex px={4} pb={2} display={props.isOpen ? "flex" : "none"} h="60%">
        <Text textAlign={"justify"} color="white">
          {children}
        </Text>
      </Flex>
    </VStack>
  );
}

export default function Sidebar({ open }) {
  return (
    <Flex w="50%">
      <VStack w="100%" bg="gray.800" py={12} spacing={6} px={8}>
        <Heading size={"3xl"} color="white">
          DNATrain
        </Heading>
        <Text fontStyle={"italic"} color="gray.400">
          Hanarebanare no machi o tsunagu ressha wa itte shimatta ne
        </Text>

        <VStack bg="gray.800" h="100%" w="100%" borderRadius={"xl"}>
          <SidebarButton isOpen={open[0]} buttonName="Tambah Penyakit" href="/tambah-penyakit">
            Non laborum sint reprehenderit et ea qui duis. Cupidatat sit incididunt dolore officia
            irure nulla consectetur. Officia voluptate dolor id aute quis eu proident ut do nostrud
            elit commodo tempor.
          </SidebarButton>
          <SidebarButton isOpen={open[1]} buttonName="Tambah Test" href="/tambah-test">
            Ea ipsum culpa sint sunt dolor irure consequat incididunt enim sunt. Cupidatat elit in
            elit non enim eu nisi pariatur ex pariatur velit ut dolor. Occaecat sunt ex cillum
            labore id et officia minim.
          </SidebarButton>
          <SidebarButton isOpen={open[2]} buttonName="Cek History" href="/cek-history">
            Deserunt non Lorem nostrud laboris esse voluptate laboris do dolor. Nostrud non mollit
            culpa qui do nulla enim. Culpa sint dolor duis non in magna aute.
          </SidebarButton>
        </VStack>
      </VStack>
    </Flex>
  );
}
