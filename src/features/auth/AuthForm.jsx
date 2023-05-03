import { useAuthMutation } from "@/store/api";
import { setToken } from "@/store/slices/auth/authSlice";
import { Pathnames } from "@/utils/constants";
import { Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authorize, authorizeReqState] = useAuthMutation();

  const toast = useToast();

  const onInputEmail = (e) => setEmail(e.target.value);
  const onInputPassword = (e) => setPassword(e.target.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitAuth = async () => {
    try {
      const payload = { email, password };
      const { access } = await authorize(payload).unwrap();

      if (!access) throw new Error();

      dispatch(setToken({ token: access }));
      navigate(Pathnames.ROOT);
    } catch (e) {
      toast({
        title: "Auth Error!",
        description: "Incorrect password or email",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
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
        <Button colorScheme="green" onClick={onSubmitAuth} isLoading={authorizeReqState.isLoading}>
          Sign In
        </Button>
      </Stack>
    </form>
  );
};

export { AuthForm };
