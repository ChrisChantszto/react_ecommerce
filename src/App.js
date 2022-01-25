import { useState, useEffect } from 'react'
import Butter from 'buttercms'
import { Container, Box, Image, Flex, Button, Spacer, Heading, Divider, SimpleGrid, Text } from '@chakra-ui/react'
import { FiShoppingCart, FiShoppingBag } from "react-icons/fi"
const butter = Butter(process.env.REACT_APP_BUTTER_ECOMMERCE)

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await butter.content.retrieve(["cookies"], {
        order: "name",
      });
      const { data } = await res.data;
      const allProducts = data.cookies;
      setProducts(allProducts);
    }
    fetchData();
  }, []);
  return (
    <Container maxW="container.xl" h="100vh">
      <Flex>
        <Box p='2'>
          <Heading size='md' my="5px" color="gray.900">Tea Bag Online Shop</Heading>
        </Box>
        <Spacer />
        <Box>
          <Button 
            colorScheme='teal' 
            size="lg" 
            variant="ghost" 
            leftIcon={<FiShoppingBag size="24px" />} 
            p={2} 
            my="5px"
            className="snipcart-checkout"
            >
              View Cart
            </Button>
        </Box>
    </Flex>
    <Divider />
    <br />
    <Box mt={4}>
      <SimpleGrid 
        minChildWidth="300px" 
        align="center" 
        justify="center" 
        spacing="40px" 
        mb={32}
      >
        {products.map((product) => (
          <div>
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image
                h="350px"
                fit="cover"
                src={product.image}
                alt={`Picture of ${product.name}`}
                roundedTop="lg"
              />
            <Box p="6">
                <Flex
                  mt="1"
                  justifyContent="space-between"
                  alignContent="center"
                >
                  <Text
                    fontSize="2xl"
                    fontWeight="semibold"
                    as="h4"
                    textTransform="uppercase"
                    lineHeight="tight"
                    fontFamily="Roboto"
                  >
                    {product.name}
                  </Text>
                  <Text
                    as="h4"
                    fontSize="2xl"
                    fontWeight="bold"
                    color="teal.600"
                  >
                    ${product.price}
                  </Text>
                </Flex>

                <Text
                  mt={2}
                  color="gray.500"
                  display={{ base: "none", md: "flex" }}
                >
                  {product.description}
                </Text>

                <Button
                  leftIcon={<FiShoppingCart size="24px" />}
                  size="lg"
                  mt={4}
                  isFullWidth
                  colorScheme="blue"
                  variant="outline"
                  alignSelf={"center"}
                  className="snipcart-add-item"
                  data-item-id={product.id}
                  data-item-image={product.image}
                  data-item-name={product.name}
                  data-item-url="/"
                  data-item-description={product.description}
                  data-item-price={product.price}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </div>
        ))}
      </SimpleGrid>
      </Box>
    </Container>
  );
}