import { Heading } from "@chakra-ui/react";

import styles from "./header.module.css";
import { CartMenu } from "../cartMenu";

const Header = () => {
  return (
    <header className={styles.header}>
      <Heading>Онлайн магазин</Heading>
      <CartMenu />
    </header>
  );
};

export { Header };
