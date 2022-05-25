import {
  ChakraProvider,
  extendTheme,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import "@/styles/globals.scss";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Flex
        as="nav"
        w="100%"
        px={{ base: 6, lg: 24 }}
        py={{ base: 4, lg: 4 }}
        justify="flex-end"
        pos="absolute"
        top={0}
        left={0}
      >
        <Menu>
          <MenuButton as={IconButton} icon={<HamburgerIcon />} />
          <MenuList>
            <MenuItem>
              <NextLink href="/" passHref>
                <Link>Home</Link>
              </NextLink>
            </MenuItem>
            <MenuItem>
              <NextLink href="/walls-team" passHref>
                <Link>Walls Team</Link>
              </NextLink>
            </MenuItem>
            <MenuItem>
              <NextLink href="/upwork" passHref>
                <Link>Upwork</Link>
              </NextLink>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
