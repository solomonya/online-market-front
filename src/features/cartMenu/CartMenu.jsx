import { ShowList } from "@/components";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { ProductInCart } from "./ProductInCart";

const CartMenu = () => {
  const productsInCart = useSelector(state => state.cart.productsQuantity);

  return (
    <Menu>
      <MenuButton as={Button}>Корзина</MenuButton>
      <MenuList>
        <ShowList list={productsInCart}>
          {
            ({ product_id, quantity }) => (
              <MenuItem key={product_id}>
                <ProductInCart product_id={product_id} quantity={quantity} />
              </MenuItem>
            )
          }
        </ShowList>
        <Button>Купить</Button>
      </MenuList>
    </Menu>
  );
};

export { CartMenu };
