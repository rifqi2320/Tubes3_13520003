import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import FileInput from "../components/forms/fileinput";
import Sidebar from "../components/sidebar/sidebar";
import { useState } from "react";
import ax from "../lib/axios";

export default function Penyakit() {
  const [penyakit, setPenyakit] = useState("");
  const [DNA, setDNA] = useState("");
  const toast = useToast();

  const handleFile = (e) => {
    var file = e.target.files[0];
    if (file.type.match(/text.*/)) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var contents = e.target.result;
        setDNA(contents);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e) => {
    if (DNA.length > 255) {
      toast({
        title: "Gagal",
        description: "DNA terlalu panjang",
        status: "error",
      });
      return;
    }
    toast({
      title: "Uploading",
      description: "Uploading...",
      status: "info",
    });
    ax.post("penyakit/create", {
      nama: penyakit,
      dna: DNA,
    }).then((res) => {
      if (res.data.success) {
        toast({
          title: "Berhasil",
          description: "Penyakit berhasil ditambahkan",
          status: "success",
        });
      } else {
        toast({
          title: "Gagal",
          description: "Penyakit gagal ditambahkan",
          status: "error",
        });
      }
    });
  };

  return (
    <Flex w="100vw" h="100vh">
      <Sidebar open={[true, false, false]} />
      <HStack
        w="100%"
        p={6}
        bgImage="url('https://c.tenor.com/5aPa1uP568wAAAAC/anime-inabakumori.gif')"
        bgPosition={"30% 30%"}
      >
        <VStack w="100%" h="80%" spacing={16}>
          <Grid
            w="100%"
            row={2}
            gap={4}
            column={4}
            bg="white"
            p={6}
            templateColumns="repeat(4,1fr)"
            borderRadius={"xl"}
          >
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel>Nama Penyakit</FormLabel>
                <Input
                  value={penyakit}
                  onChange={(e) => {
                    setPenyakit(e.target.value);
                  }}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>DNA Sekuens</FormLabel>
                <Textarea
                  value={DNA}
                  onChange={(e) => {
                    setDNA(e.target.value);
                  }}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>File</FormLabel>
                <FileInput onChange={handleFile} />
              </FormControl>
            </GridItem>
            <GridItem>
              <Button p={6} colorScheme="blue" borderRadius={"xl"} onClick={handleSubmit}>
                <Text fontWeight={"light"}>Tambahkan Penyakit</Text>
              </Button>
            </GridItem>
          </Grid>
        </VStack>
      </HStack>
    </Flex>
  );
}
