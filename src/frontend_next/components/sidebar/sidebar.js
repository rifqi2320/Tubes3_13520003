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
            Halaman ini dapat digunakan untuk menambahkan nama penyakit dan memasukkan sekuens DNA dari jenis penyakit yang hendak Anda tambahkan tersebut.
          </SidebarButton>
          <SidebarButton isOpen={open[1]} buttonName="Tambah Test" href="/tambah-test">
            Halaman ini digunakan untuk melakukan tes kecocokan DNA pengguna dengan penyakit yang telah tersedia di menu pilihan penyakit. 
            Pengguna diminta untuk meng-input sekuens DNA miliknya. 
            Pengguna dapat memilih metode matching DNA yang diinginkan, yaitu metode KMP maupun Boyer-Moore.
          </SidebarButton>
          <SidebarButton isOpen={open[2]} buttonName="Cek History" href="/cek-history">
            Halaman ini menampilkan urutan hasil prediksi dengan kolom pencarian di dalamnya.
            Pengguna dapat melihat history hasil prediksinya dengan menggunakan kolom pencarian dengan menginput nama pengguna.
          </SidebarButton>
        </VStack>
      </VStack>
    </Flex>
  );
}
