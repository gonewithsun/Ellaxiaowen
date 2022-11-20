import React from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  useColorModeValue,
  SimpleGrid,
  Image,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";

const PoolsCard = (props:any) => {
  return (
    <SimpleGrid columns={{ sm: 2, lg: 4 }} gap={4} mb={8}>
      {props.data.map(
        ({
          id,
          token1,
          token2,
          poolLiquidity,
          apr,
          myLiquidity,
          myBoundedAmount,
          longestDaysUnbonding
        }) => {
          return (
            <Box
              key={id}
              borderRadius="lg"
              border="1px solid"
              borderColor="#ccc"
              boxShadow="md"
              p={4}
            >
              <Flex align="center" mb={4}>
                <Flex
                  position="relative"
                  align="center"
                  pr={{ base: 10, sm: 14 }}
                >
                  <Box
                    w={{ base: 12, md: 14, lg: 16 }}
                    h={{ base: 12, md: 14, lg: 16 }}
                    bg="whiteAlpha.900"
                    borderRadius="full"
                    border="1px solid"
                    borderColor="#ccc"
                    overflow="hidden"
                    p={0.5}
                  >
                    <Image src={token1.imgSrc} />
                  </Box>
                  <Box
                    position="absolute"
                    left={{ base: 8, sm: 10 }}
                    w={{ base: 12, md: 14, lg: 16 }}
                    h={{ base: 12, md: 14, lg: 16 }}
                    bg="whiteAlpha.900"
                    borderRadius="full"
                    border="1px solid"
                    borderColor="#ccc"
                    overflow="hidden"
                    p={0.5}>
                    <Image src={token2.imgSrc} />
                  </Box>
                </Flex>
                <Flex flexDirection="column" justify="center">
                { props.Flags &&
                  <>
                  <Button display={{ base: "none", sm: "block" }} 
                  border="1px solid"
                  borderColor="#000"
                  onClick={()=>props.handleRemove(id)}>remove</Button>
                  <Button display={{ base: "none", sm: "block" }} 
                  border="1px solid"
                  borderColor="#000"
                  onClick={()=>props.handleUpdate(id)}>update</Button>
                  </>
                }
                  <Text fontSize="xl" fontWeight="extrabold">
                    Pools #{id}
                  </Text>
                  <Text
                    fontWeight="bold"
                    borderColor="#ccc"
                    wordBreak="break-word"
                  >
                    {token1.name}/{token2.name}
                  </Text>
                  
                </Flex>
              </Flex>
              <Grid
                templateColumns={{ lg: "1fr 1fr" }}
                gap={{ base: 2, md: 4 }}
              >
                <GridItem>
                  <Text
                    fontWeight="semibold"
                  >
                    Pool Liquidity
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                    wordBreak="break-word"
                  >
                    ${poolLiquidity.toLocaleString()}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color="#ccc"
                  >
                    Apr
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                  >
                    {apr}%
                  </Text>
                </GridItem>
                <GridItem colSpan={{ lg: 2 }}>
                  <Divider
                    borderColor="#ccc"
                  />
                </GridItem>
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color="#ccc"
                  >
                    My Liquidity
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                  >
                    ${myLiquidity}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color="#ccc"
                  >
                    My Bounded Amount
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                  >
                    ${myBoundedAmount}
                  </Text>
                </GridItem>
              </Grid>
            </Box>
          );
        }
      )}
    </SimpleGrid>
  );
}

export default PoolsCard;