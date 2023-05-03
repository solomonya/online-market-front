import { ShowIf } from "@/components";
import { useProductByIdQuery } from "@/store/api/products/productsEndpoint";
import {
  decreaseCartQuantity,
  increaseCartQuantity,
  removeFromCart,
} from "@/store/slices/cart/cartSlice";
import { CloseIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, IconButton, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const ProductInCart = ({ product_id, quantity, index }) => {
  const dispatch = useDispatch();
  const { data: productReq } = useProductByIdQuery({ product_id });
  const product = productReq ? productReq[0] : {};

  const onIncrease = () => {
    dispatch(increaseCartQuantity({ product_id }));
  };
  const onDecrease = () => {
    dispatch(decreaseCartQuantity({ product_id }));
  };
  const onDeleteFromCart = () => dispatch(removeFromCart({ productId: product_id }));

  return (
    <Container p={0}>
      <Flex justifyContent={"space-between"}>
          <Text fontSize={"xl"}>{index + 1}. {product.name}</Text>
        <Flex alignItems={"center"} gap={3}>
        <Flex alignItems={"center"} gap={2}>
          <ShowIf condition={quantity > 1}>
            <Button size={"sm"} onClick={onDecrease}>
              -
            </Button>
          </ShowIf>

          <Text fontSize={"xl"}>{quantity}</Text>
          <Button size={"sm"} onClick={onIncrease}>
            +
          </Button>
        </Flex>
        <IconButton
            icon={<CloseIcon />}
            onClick={onDeleteFromCart}
            size={"xs"}
            colorScheme={"red"}
          />
        </Flex>
      </Flex>
    </Container>
  );
};

export { ProductInCart };
