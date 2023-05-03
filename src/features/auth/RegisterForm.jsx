import { useRegisterMutation } from "@/store/api/auth/authEnpoint";
import { Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, registerReqState] = useRegisterMutation();

  const toast = useToast();

  const reset = () => {
    setEmail("");
    setPassword("");
  };
  const onInputEmail = (e) => setEmail(e.target.value);
  const onInputPassword = (e) => setPassword(e.target.value);

  const onSubmitRegister = async () => {
    try {
      const payload = {
        email,
        password,
      };
      await register(payload);
      reset();
      toast({
        title: "You have successfully logged in!",
        description: "You can log in and make purchases.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Registration error!",
        description: "Try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      reset();
    }
  };

  return (
    <form>
      <Stack spacing={5}>
        <Stack spacing={2}>
          <Text>Email</Text>
          <Input
            placeholder="example@gmail.com"
            type="email"
            value={email}
            onInput={onInputEmail}
          />
        </Stack>
        <Stack spacing={2}>
          <Text>Password</Text>
          <Input type="password" value={password} onInput={onInputPassword} />
        </Stack>
        <Button
          colorScheme="green"
          onClick={onSubmitRegister}
          isLoading={registerReqState.isLoading}
        >
          Register
        </Button>
      </Stack>
    </form>
  );
};

export { RegisterForm };
