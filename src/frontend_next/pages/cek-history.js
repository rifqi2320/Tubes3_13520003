import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Select,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Sidebar from "../components/sidebar/sidebar";
import ax from "../lib/axios";
import { useState, useEffect } from "react";

export default function History() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const [hasil, setHasil] = useState("");
  const [urut, setUrut] = useState("");
  const [ascModifier, setAscModifier] = useState(1);
  const [title, setTitle] = useState("");

  useEffect(() => {
    ax.get("/test/get").then((res) => {
      setData([...res.data.data]);
    });
  }, []);

  useEffect(() => {
    setSearchData(
      data
        .filter((item) => {
          if (hasil === "") {
            return item;
          } else {
            return item.hasil.toString() == hasil;
          }
        })
        .sort((a, b) => {
          if (urut === "") {
            return ascModifier * (a.id - b.id);
          } else if (urut === "tanggal") {
            return ascModifier * (new Date(a.tanggal) - new Date(b.tanggal));
          } else if (urut === "kecocokan") {
            return ascModifier * (a.kecocokan - b.kecocokan);
          } else if (urut === "nama") {
            return ascModifier * a.nama.localeCompare(b.nama);
          }
        })
    );
  }, [data, hasil, urut, ascModifier]);

  const handleSearch = () => {
    setData([]);
    const a = search.split(" ");
    const newTitle = a[a.length - 1];
    setTitle([newTitle[0].toUpperCase(), newTitle.slice(1)].join(""));
    ax.get(`/test/get?q=${search}`).then((res) => {
      setData([...res.data.data]);
    });
  };

  return (
    <Flex w="100vw" h="100vh">
      <Sidebar open={[false, false, true]} />
      <Flex
        w="100%"
        h="100vh"
        bgImage={"url('https://c.tenor.com/plIYmZefnV8AAAAC/lag-train.gif')"}
        p={6}
      >
        <VStack
          w="150%"
          p={6}
          bgGradient="linear(to-t, rgba(255,255,255,0.95), rgba(255,255,255,0.99))"
          borderRadius={"xl"}
          overflowY="auto"
        >
          <Heading mb={2}>History{title ? ` of ${title}` : null}</Heading>
          <HStack w="full">
            <Input
              placeholder="Search..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />

            <Select
              w="25%"
              onChange={(e) => {
                setHasil(e.target.value);
              }}
            >
              <option value="">Status</option>
              <option value={true}>Benar</option>
              <option value={false}>Salah</option>
            </Select>
            <Select
              w="40%"
              onChange={(e) => {
                setUrut(e.target.value);
              }}
            >
              <option value="">Sort by</option>
              <option value="tanggal">Tanggal</option>
              <option value="nama">Nama</option>
              <option value="kecocokan">Kecocokan</option>
            </Select>

            <Text>Asc</Text>
            <Switch
              onChange={(e) => {
                setAscModifier(e.target.checked ? -1 : 1);
              }}
            />
            <Text>Desc</Text>

            <Button colorScheme={"blue"} fontWeight="light" w="25%" onClick={handleSearch}>
              Search
            </Button>
          </HStack>
          <Table variant="striped">
            <Thead position="sticky" top="-5px" bg="white" pt="5">
              <Tr>
                <Th textAlign="center">No</Th>
                <Th textAlign="center">Tanggal</Th>
                <Th textAlign="center">Nama Pasien</Th>
                <Th textAlign="center">Penyakit</Th>
                <Th textAlign="center">Tingkat kecocokan</Th>
                <Th textAlign="center">Hasil</Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchData.map((item, index) => (
                <Tr key={index}>
                  <Td textAlign="center">{index + 1}</Td>
                  <Td textAlign="center">{new Date(item.tanggal).toLocaleString()}</Td>
                  <Td textAlign="center">{item.nama}</Td>
                  <Td textAlign="center">{item.nama_penyakit}</Td>
                  <Td textAlign="center">{item.kecocokan.toFixed(2)}</Td>
                  <Td textAlign="center">{item.hasil ? "Benar" : "Salah"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      </Flex>
    </Flex>
  );
}
