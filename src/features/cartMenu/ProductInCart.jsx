import { decreaseCartQuantity, increaseCartQuantity } from "@/store/slices/cart/cartSlice";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ProductInCart = ({ product_id, quantity }) => {
  const [quantityLocal, setLocalQuantity] = useState(1);


  const onIncrease = () => {
    setLocalQuantity(prev => prev + 1)
  };
  const onDecrease = () => {
    setLocalQuantity(prev => prev - 1)
  };

  
  return (
    <Container>
      <Flex justifyContent={"space-between"}>
        <Text>{product_id}</Text>
        <Flex alignItems={"center"} gap={2}>
          <Button size={"sm"} onClick={onIncrease}>+</Button>
          <Text>{quantityLocal}</Text>
          <Button size={"sm"} onClick={onDecrease}>-</Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export { ProductInCart };
