import { useGetOrderByIdQuery } from "@/store/api/orders/orderEndpoint";
import { usePayOrderMutation } from "@/store/api/payments/paymentsEndpoint";
import { Pathnames } from "@/utils/constants";
import { Button, Center, Container, Heading, Stack, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const OrdersPage = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const { data: orderReq, isLoading } = useGetOrderByIdQuery({ id });
  const order = orderReq ?? {};

  const [pay, payReqState] = usePayOrderMutation();

  const onPay = async () => {
    await pay({ order_id: id });
    toast({
      title: "Заказ успешно оплачен!",
      description: "Ожидайте когда курьер свяжется с вами",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setTimeout(() => {
      navigate(Pathnames.ROOT);
    }, 4000)
  };

  if(order.status === 'DELIVERY') 
    return (
      <Container p={10}>
        <Center>
          <Heading>Заказ успешно оплачен!</Heading>
        </Center>
      </Container>
    );

  return (
    <Container p={10}>
      <Stack spacing={5}>
        <Heading>Заказ №{id}</Heading>
        <Heading>Город: {order.location}</Heading>
        <Button
          variant={"solid"}
          colorScheme={"green"}
          onClick={onPay}
          isLoading={payReqState.isLoading}
          disabled={isLoading}
        >
          Оплатить ${order.total}
        </Button>
      </Stack>
    </Container>
  );
};

export { OrdersPage };
