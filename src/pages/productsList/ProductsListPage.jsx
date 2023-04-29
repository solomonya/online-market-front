import { ShowList } from "@/components";
import { Header } from "@/features/header";
import { ProductCard } from "@/features/productsList";
import { useProductsListQuery } from "@/store/api";
import { selectProductsIdsFromCart } from "@/store/slices/cart/cartSlice";
import { Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const ProductsListPage = () => {
  const { data: productsList, isLoading } = useProductsListQuery();
  const productsInCartIds = useSelector(selectProductsIdsFromCart);

  return (
    <Grid autoRows={true} gap={5}>
      <GridItem>
        <Header />
      </GridItem>
      <GridItem>
        <Grid templateColumns="repeat(4, 1fr)" gap={5} p={7}>
          <ShowList list={productsList ?? []}>
            {(product) => (
              <GridItem key={product.product_id}>
                <ProductCard
                  {...product}
                  isProductInCart={productsInCartIds.includes(product.product_id)}
                />
              </GridItem>
            )}
          </ShowList>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export { ProductsListPage };
