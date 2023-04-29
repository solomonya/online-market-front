import { AuthForm } from "@/features/auth";
import {
  Container,
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const AuthPage = () => {
  return (
    <div
      style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Container maxW="2xl" centerContent>
        <SimpleGrid autoRows={true} rowGap={5}>
          <Heading as={"h5"} size={"lg"}>
            Страница авторизации
          </Heading>
          <Tabs variant="soft-rounded" colorScheme="green" size={"lg"}>
            <TabList>
              <Tab>Авторизация</Tab>
              <Tab>Регистрация</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AuthForm />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </SimpleGrid>
      </Container>
    </div>
  );
};

export { AuthPage };
