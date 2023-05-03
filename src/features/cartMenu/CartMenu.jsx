import { ShowIf, ShowList, ShowSwitch } from "@/components";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  Stack
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { ProductInCart } from "./ProductInCart";
import { useCreateOrderMutation } from "@/store/api";
import { generatePath, useNavigate } from "react-router-dom";
import { Pathnames } from "@/utils/constants";
import { clearCart } from "@/store/slices/cart/cartSlice";
import { useModal } from "@/hooks/useModal";

const CartMenu = () => {
  const productsInCart = useSelector((state) => state.cart.productsQuantity);
  const [createOrder, createOrderReq] = useCreateOrderMutation();

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onBuy = async () => {
    const payload = {
      items: productsInCart,
    };
    try {
      const { createdOrder } = await createOrder(payload).unwrap();
      toast({
        title: "Order is successfully created!",
        description: "You will be redirected to the payment page",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      dispatch(clearCart());
      setTimeout(() => {
        navigate(generatePath(Pathnames.ORDER_ID, { id: createdOrder.order_id }));
      }, 3000);
    } catch (e) {
      toast({
        title: "Error when creating an order",
        description: "Repeat again",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const { isOpen, open, close } = useModal(false);

  return (
    <>
      <Button onClick={open} colorScheme="green">Cart</Button>
      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ShowSwitch conditions={[productsInCart.length > 0]}>
              <Stack spacing={5}>
                <ShowList list={productsInCart}>
                  {
                    ({ product_id, quantity }, index) => (
                      <ProductInCart index={index} key={product_id} product_id={product_id} quantity={quantity} />
                    )
                  }
                </ShowList>
              </Stack>
              <Text fontSize={"2xl"} fontWeight={600} display={"inline-block"} paddingBottom={5}>Cart is empty</Text>
            </ShowSwitch>
          </ModalBody>
          <ShowIf condition={productsInCart.length > 0}>
            <ModalFooter>
              <Button colorScheme={"green"} onClick={onBuy} isLoading={createOrderReq.isLoading}>
                Buy
              </Button>
            </ModalFooter>
          </ShowIf>
        </ModalContent>
      </Modal>
    </>
  );
};

export { CartMenu };
