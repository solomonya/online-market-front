import { AuthForm, RegisterForm } from "@/features/auth";
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
      <Container centerContent>
        <SimpleGrid autoRows={true} rowGap={5}>
          <Heading as={"h5"} size={"lg"} textAlign={"center"}>
            Auth Page
          </Heading>
          <Tabs variant="soft-rounded" colorScheme="green" size={"lg"}>
            <TabList>
              <Tab>Sign In</Tab>
              <Tab>Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AuthForm />
              </TabPanel>
              <TabPanel>
                <RegisterForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </SimpleGrid>
      </Container>
    </div>
  );
};

export { AuthPage };
