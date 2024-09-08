import {
	Container,
	SimpleGrid,
	Spinner,
	Text,
	VStack,
	Input,
	InputGroup,
	InputRightElement,
	IconButton,
	Flex,
  } from "@chakra-ui/react";
  import { SearchIcon } from "@chakra-ui/icons";
  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import { useProductStore } from "../store/product";
  import ProductCard from "../components/ProductCard";
  
  const HomePage = () => {
	const { fetchProducts, products } = useProductStore();
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredProducts, setFilteredProducts] = useState([]);
  
	useEffect(() => {
	  const loadProducts = async () => {
		setLoading(true);
		await fetchProducts();
		setLoading(false);
	  };
  
	  loadProducts();
	}, [fetchProducts]);
  
	useEffect(() => {
	  const filterProducts = () => {
		const lowercasedQuery = searchQuery.toLowerCase();
		const result = products.filter(
		  (product) =>
			product.name.toLowerCase().includes(lowercasedQuery) ||
			product.price.toString().includes(lowercasedQuery)
		);
		setFilteredProducts(result);
	  };
  
	  filterProducts();
	}, [searchQuery, products]);
  
	return (
	  <Container maxW="container.xl" py={12}>
		<VStack spacing={8}>
		  <Text
			fontSize={"30"}
			fontWeight={"bold"}
			bgGradient={"linear(to-r, cyan.400, blue.500)"}
			bgClip={"text"}
			textAlign={"center"}
		  >
			Current Products 🚀
		  </Text>
  
		  <InputGroup maxW="lg" w="full" px={{ base: 4, md: 0 }}>
			<Input
			  placeholder="Search products by name or price..."
			  value={searchQuery}
			  onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<InputRightElement>
			  <IconButton
				icon={<SearchIcon />}
				aria-label="Search"
				variant="outline"
			  />
			</InputRightElement>
		  </InputGroup>
  
		  {loading ? (
			<Spinner size="xl" />
		  ) : (
			<Flex
			  w="full"
			  justify="center"
			  align="center"
			  minHeight="200px" // Adjust this value to set a minimum height for the container
			>
			  {filteredProducts.length > 0 ? (
				<SimpleGrid
				  columns={{
					base: 1,
					md: 2,
					lg: 3,
				  }}
				  spacing={10}
				  w={"full"}
				>
				  {filteredProducts.map((product) => (
					<ProductCard key={product._id} product={product} />
				  ))}
				</SimpleGrid>
			  ) : searchQuery ? (
				<Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
				  No products found matching "{searchQuery}" 😢
				</Text>
			  ) : (
				<Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
				  No products found 😢{" "}
				  <Link to="/create">
					<Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
					  Create a product
					</Text>
				  </Link>
				</Text>
			  )}
			</Flex>
		  )}
		</VStack>
	  </Container>
	);
  };
  
  export default HomePage;
  