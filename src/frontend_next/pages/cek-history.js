import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Select,
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
  const [listPenyakit, setListPenyakit] = useState([]);
  const [penyakit, setPenyakit] = useState("");
  const [hasil, setHasil] = useState("");

  useEffect(() => {
    ax.get("/test/get").then((res) => {
      setData([...res.data.data]);
    });
    ax.get("/penyakit/get").then((res) => {
      setListPenyakit([...res.data.data]);
    });
  }, []);

  useEffect(() => {
    setSearchData(
      data
        .filter((item) => {
          return item.nama.toLowerCase().includes(search.toLowerCase());
        })
        .filter((item) => {
          if (penyakit === "") {
            return item;
          } else {
            return item.nama_penyakit == penyakit;
          }
        })
        .filter((item) => {
          console.log(item, hasil);
          if (hasil === "") {
            return item;
          } else {
            return item.hasil.toString() == hasil;
          }
        })
    );
  }, [data, search, penyakit, hasil]);

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
          <Heading>History</Heading>
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
                setPenyakit(e.target.value);
              }}
            >
              <option value="">Penyakit</option>
              {listPenyakit.map((item, index) => {
                return (
                  <option key={index} value={item.nama}>
                    {item.nama}
                  </option>
                );
              })}
            </Select>
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
                  <Td textAlign="center">{item.hasil ? "benar" : "salah"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      </Flex>
    </Flex>
  );
}
