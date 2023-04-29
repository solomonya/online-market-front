import { ShowList } from "@/components";
import { selectProductsIdsFromCart } from "@/store/slices/cart/cartSlice";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { ProductInCart } from "./ProductInCart";

const CartMenu = () => {
  const productsInCart = useSelector(selectProductsIdsFromCart);


  return (
    <Menu>
      <MenuButton as={Button}>Корзина</MenuButton>
      <MenuList>
        <ShowList list={productsInCart}>
          {
            (product_id) => (
              <MenuItem key={product_id}>
                <ProductInCart product_id={product_id} />
              </MenuItem>
            )
          }
        </ShowList>
      </MenuList>
    </Menu>
  );
};

export { CartMenu };
