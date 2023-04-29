import { ShowIf, ShowList, ShowSwitch } from "@/components";
import {
  Button,
  Center,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { ProductInCart } from "./ProductInCart";
import { useCreateOrderMutation } from "@/store/api";
import { generatePath, useNavigate } from "react-router-dom";
import { Pathnames } from "@/utils/constants";
import { clearCart } from "@/store/slices/cart/cartSlice";

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
        title: "Заказ успешно создан",
        description: "Вас перенаправят на страницу оплаты",
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
        title: "Ошибка при создании заказа",
        description: "Повторите заново",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Menu>
      <MenuButton as={Button} colorScheme={"green"}>
        Корзина
      </MenuButton>
      <MenuList>
        <ShowSwitch conditions={[productsInCart.length > 0]}>
          <>
            <ShowList list={productsInCart}>
              {({ product_id, quantity }) => (
                <MenuItem key={product_id}>
                  <ProductInCart product_id={product_id} quantity={quantity} />
                </MenuItem>
              )}
            </ShowList>
            <Center py={3}>
              <Button isLoading={createOrderReq.isLoading} onClick={onBuy}>
                Купить
              </Button>
            </Center>
          </>
          <Heading size={"xl"} p={3}>
            Корзина пуста!
          </Heading>
        </ShowSwitch>
      </MenuList>
    </Menu>
  );
};

export { CartMenu };
