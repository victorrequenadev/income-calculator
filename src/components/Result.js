import { Box, Flex, Heading } from "@chakra-ui/react";

function Result({ gross, fees, feesPct }) {
  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      justifyContent="center"
      gap={5}
      w={{ lg: "65%" }}
      p={6}
      px={{ base: 8, lg: 6 }}
      bg="whiteAlpha.100"
      borderRadius={{ base: "", lg: "lg" }}
    >
      <Box>
        <Heading color="pink.50" size="md">
          Gross total
        </Heading>
        <Heading color="orange.200" size="md">
          ${gross.toFixed(2)}
        </Heading>
      </Box>
      <Flex gap={6}>
        <Box>
          <Heading color="pink.50" size="md">
            Fees
          </Heading>
          <Heading color="pink.400" size="md">
            -${fees.toFixed(2)}
          </Heading>
        </Box>
        <Box>
          <Heading color="pink.50" size="md">
            %
          </Heading>
          <Heading color="pink.400" size="md">
            {feesPct.toFixed(2)}
          </Heading>
        </Box>
      </Flex>
      <Box>
        <Heading color="pink.50" size="md">
          Net total
        </Heading>
        <Heading color="teal.200" size="md">
          ${(gross - fees).toFixed(2)}
        </Heading>
      </Box>
    </Flex>
  );
}

export default Result;
