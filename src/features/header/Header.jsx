import { Button, Flex, Heading } from "@chakra-ui/react";

import styles from "./header.module.css";
import { CartMenu } from "../cartMenu";
import { useDispatch, useSelector } from "react-redux";
import { isAuthSelect, logout } from "@/store/slices/auth/authSlice";
import { ShowSwitch } from "@/components";
import { useNavigate } from "react-router-dom";
import { Pathnames } from "@/utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthSelect);

  const onAuth = () => navigate(Pathnames.LOGIN);
  const onLogout = () => dispatch(logout());

  return (
    <header className={styles.header}>
      <Heading>Онлайн магазин</Heading>
      <ShowSwitch conditions={[isAuth]}>
        <Flex alignItems={"center"} gap={3}>
          <CartMenu />
          <Button onClick={onLogout}>Выйти</Button>
        </Flex>
        <Button variant={"link"} onClick={onAuth} colorScheme={"green"}>
          Авторизоваться
        </Button>
      </ShowSwitch>
    </header>
  );
};

export { Header };
