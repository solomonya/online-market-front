import { ShowIf } from "@/components";
import { useProductByIdQuery } from "@/store/api/products/productsEndpoint";
import { decreaseCartQuantity, increaseCartQuantity } from "@/store/slices/cart/cartSlice";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const ProductInCart = ({ product_id, quantity }) => {
  const dispatch = useDispatch();
  const { data: productReq } = useProductByIdQuery({ product_id });
  const product = productReq ? productReq[0] : {};

  const onIncrease = () => {
    dispatch(increaseCartQuantity({ product_id }));
  };
  const onDecrease = () => {
    dispatch(decreaseCartQuantity({ product_id }));
  };

  return (
    <Container>
      <Flex justifyContent={"space-between"}>
        <Text>{product.name}</Text>
        <Flex alignItems={"center"} gap={2}>
          <ShowIf condition={quantity > 1}>
            <Button size={"sm"} onClick={onDecrease}>
              -
            </Button>
          </ShowIf>

          <Text>{quantity}</Text>
          <Button size={"sm"} onClick={onIncrease}>
            +
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export { ProductInCart };
