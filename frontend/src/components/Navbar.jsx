import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon, IoHome } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Phemla Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/"}>
            <Tooltip label="Home" aria-label="Home Tooltip">
              <Button>
                <IoHome fontSize={20} />
              </Button>
            </Tooltip>
          </Link>
          <Link to={"/create"}>
            <Tooltip label="Create Product" aria-label="Create Product Tooltip">
              <Button>
                <PlusSquareIcon fontSize={20} />
              </Button>
            </Tooltip>
          </Link>
          <Tooltip
            label={colorMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label="Color Mode Tooltip"
          >
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
            </Button>
          </Tooltip>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
