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
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import FileInput from "../components/forms/fileinput";
import Sidebar from "../components/sidebar/sidebar";
import { useState, useEffect } from "react";
import ax from "../lib/axios";

export default function Penyakit() {
  const [pasien, setPasien] = useState("");
  const [DNA, setDNA] = useState("");
  const toast = useToast();
  const [penyakit, setPenyakit] = useState("");
  const [listPenyakit, setListPenyakit] = useState([]);

  useEffect(() => {
    ax.get("/penyakit/get").then((res) => {
      setListPenyakit([...res.data.data]);
    });
  }, []);

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
    ax.post("/test/create", {
      nama: pasien,
      dna: DNA,
      nama_penyakit: penyakit,
      matching_method: "KMP",
    }).then((res) => {
      if (res.data.success) {
        toast({
          title: "Sukses",
          description: "Test berhasil dilakukan",
          status: "success",
        });
      } else {
        toast({
          title: "Gagal",
          description: "Test gagal dilakukan",
          status: "error",
        });
      }
    });
  };

  return (
    <Flex w="100vw" h="100vh">
      <Sidebar open={[false, true, false]} />
      <HStack
        w="100%"
        p={6}
        bgImage={"url('https://c.tenor.com/x8UIzwydU-gAAAAC/inabakumori-nukunuku-nigirimeshi.gif')"}
        bgPosition={"40% 40%"}
      >
        <VStack w="100%" h="80%" spacing={16}>
          <Grid
            w="100%"
            row={2}
            gap={4}
            column={4}
            p={6}
            templateColumns="repeat(4,1fr)"
            borderRadius={"xl"}
            bg="white"
          >
            <GridItem colSpan={3}>
              <FormControl>
                <FormLabel>Nama Pasien</FormLabel>
                <Input
                  value={pasien}
                  onChange={(e) => {
                    setPasien(e.target.value);
                  }}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Penyakit</FormLabel>
                <Select
                  onChange={(e) => {
                    setPenyakit(e.target.value);
                  }}
                >
                  {listPenyakit.map((penyakit, index) => (
                    <option key={index} value={penyakit.nama}>
                      {penyakit.nama}
                    </option>
                  ))}
                </Select>
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
                <Text fontWeight={"light"}>Lakukan Tes</Text>
              </Button>
            </GridItem>
          </Grid>
        </VStack>
      </HStack>
    </Flex>
  );
}
