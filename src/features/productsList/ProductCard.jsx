import { ShowIf, ShowSwitch } from "@/components";
import { isAuthSelect } from "@/store/slices/auth/authSlice";
import { addToCart } from "@/store/slices/cart/cartSlice";
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Container,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = (product) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelect);

  const onAddToCart = () => {
    const payload = { product_id: product.product_id, quantity: 1 };
    dispatch(addToCart(payload));
  };

  return (
    <Card maxW={"sm"}>
      <CardBody>
        <Image
          src="https://xzcvlfryrnbfyqpvgymp.supabase.co/storage/v1/object/public/images/public/1.jpg"
          alt="glasses image"
          borderRadius="lg"
        />
        <Stack mt={6} spacing={3}>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Stack spacing={2}>
              <Heading size="md">{product.name}</Heading>
              <Badge w={"fit-content"} colorScheme={"green"}>
                {product.provider_name}
              </Badge>
            </Stack>
            <Text color="green.600" fontSize="2xl">
              ${product.price}
            </Text>
          </Flex>
          <Text>{product.description}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <ShowIf condition={isAuth}>
        <CardFooter>
          <ButtonGroup spacing="2">
            <ShowSwitch conditions={[product.isProductInCart]}>
              <Text size={"xl"} fontWeight={600} color={"green"}>
                Product in cart
              </Text>
              <Button variant="solid" colorScheme="green" onClick={onAddToCart}>
                Add to cart
              </Button>
            </ShowSwitch>
          </ButtonGroup>
        </CardFooter>
      </ShowIf>
    </Card>
  );
};

export { ProductCard };
