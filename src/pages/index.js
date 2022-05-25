import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

function Home() {
  return (
    <Flex w="100%" minH="100%">
      <Head>
        <title>Income Calculator</title>
        <meta name="description" content="Income Calculator" />
      </Head>
      <Center flex={1}>
        <Stack spacing={6}>
          <Heading>Income Calculator</Heading>
          <ButtonGroup spacing={6} justifyContent="center">
            <LinkBox>
              <Button colorScheme="blue">
                <NextLink href="/walls-team">
                  <LinkOverlay>Walls Team</LinkOverlay>
                </NextLink>
              </Button>
            </LinkBox>
            <LinkBox>
              <Button colorScheme="green">
                <NextLink href="/upwork">
                  <LinkOverlay>Upwork</LinkOverlay>
                </NextLink>
              </Button>
            </LinkBox>
          </ButtonGroup>
        </Stack>
      </Center>
    </Flex>
  );
}

export default Home;
