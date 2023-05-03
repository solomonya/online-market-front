import { MultiRangeSlider, Pagination, ShowList, ShowSwitch } from "@/components";
import { Header } from "@/features/header";
import { ProductCard } from "@/features/productsList";
import { useDebounce } from "@/hooks/useDebounce";
import { useProductsListQuery } from "@/store/api";
import { useProvidersListQuery } from "@/store/api/products/productsEndpoint";
import { selectProductsIdsFromCart } from "@/store/slices/cart/cartSlice";
import {
  setPrice,
  setProductSearch,
  setProviderName,
} from "@/store/slices/productsFilters/productsFiltersSlice";
import { setPage } from "@/store/slices/productsFilters/productsFiltersSlice";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductsListPage = () => {
  const dispatch = useDispatch();

  const productsFilters = useSelector((state) => state.products);
  const productsInCartIds = useSelector((state) =>
    state.cart.productsQuantity.map(({ product_id }) => product_id)
  );

  const { data } = useProductsListQuery(productsFilters);
  const { data: providersReq } = useProvidersListQuery();

  const providers = providersReq ?? [];

  const { results: productsList, count } = data ?? {};
  const [search, setSearch] = useState("");

  const onUpdatePage = (page) => dispatch(setPage({ page }));
  const onSearch = (e) => setSearch(e.target.value);
  const onUpdatePrice = ({ min, max }) => dispatch(setPrice({ min, max }));
  const onSetProvider = (e) => dispatch(setProviderName({ providerName: e.target.value }));
  const onClearProvider = () => dispatch(setProviderName({ providerName: "" }));

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(setProductSearch({ productSearch: debouncedSearch }));
  }, [debouncedSearch, dispatch]);

  return (
    <Grid autoRows={true} gap={5}>
      <GridItem>
        <Header />
      </GridItem>
      <GridItem>
        <Flex>
          <Flex p={7} gap={7} flexDirection={"column"} w={350}>
            <Stack>
              <FormLabel>Search by product name:</FormLabel>
              <Flex alignItems={"center"} gap={2}>
                <Input value={search} onInput={onSearch} colorScheme={"green"} variant={"filled"} />
                <SearchIcon size={"md"} />
              </Flex>
            </Stack>
            <Stack>
              <FormLabel>Provider</FormLabel>
              <Flex alignItems={"center"} gap={3}>
                <Select
                  variant="filled"
                  colorScheme={"green"}
                  onChange={onSetProvider}
                  value={productsFilters.providerName}
                >
                  <option disabled hidden value={""}>
                    Choose Provider
                  </option>
                  <ShowList list={providers}>
                    {({ name }) => (
                      <option value={name} key={name}>
                        {name}
                      </option>
                    )}
                  </ShowList>
                </Select>
                <IconButton
                  colorScheme={"red"}
                  icon={<CloseIcon />}
                  size={"sm"}
                  onClick={onClearProvider}
                />
              </Flex>
            </Stack>
            <Stack>
              <FormLabel>Price</FormLabel>
              <MultiRangeSlider min={5.5} max={21.99} onChange={onUpdatePrice} />
            </Stack>
          </Flex>
          <ShowSwitch conditions={[productsList?.length > 0]}>
            <Grid templateColumns="repeat(3, 1fr)" gap={5} p={7}>
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
            <Heading>Products not found...</Heading>
          </ShowSwitch>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex justifyContent={"flex-end"} px={5} pb={5}>
          <Pagination
            count={count}
            onUpdate={onUpdatePage}
            currentPage={productsFilters.page}
            pagesInGroup={productsFilters.limit}
          />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export { ProductsListPage };
