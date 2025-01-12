import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import Input from "Components/common/Input";
import Button from "Components/common/Button";
import { apiInstance } from "Services/axiosInstance";
import {
  BtnContainer,
  Container,
  BottomContainer,
  FormControl,
  SocialAuth,
  Title,
  OrContainer,
  PasswordShowBtn,
} from "./styled";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isLoading } = useMutation(
    () => {
      return apiInstance.post("/users/login", formInputData);
    },
    {
      onSuccess: (data) => {
        const access_token = data.headers["x-auth-token"];
        localStorage.setItem("access_token", JSON.stringify(access_token));
        const from = location.state?.from;
        if (from) {
          navigate(from);
        } else {
          toast.success("Login successful");
          navigate("/");
        }
      },
      onError: (error) => toast.error(error.response.data.error),
    },
  );

  const [formInputData, setFormInputData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormInputData({
      ...formInputData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Title>Log In</Title>
      <SocialAuth href="https://askito.herokuapp.com/api/oauth/google">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
          alt="Google"
        />
        Continue with Google
      </SocialAuth>
      <OrContainer>OR</OrContainer>
      <FormControl>
        <Input
          value={formInputData.email}
          name="email"
          type="text"
          placeholder="email"
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <Input
          value={formInputData.password}
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="password"
          onChange={handleInputChange}
        />
      </FormControl>
      <PasswordShowBtn>
        <Button handleClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"} Password
        </Button>
      </PasswordShowBtn>
      <BtnContainer>
        <Button
          handleClick={() => mutate()}
          isLoading={isLoading}
          disabled={
            isLoading ||
            formInputData.email.length === 0 ||
            formInputData.password.length === 0
          }
        >
          Login
        </Button>
      </BtnContainer>

      <BottomContainer>
        <p>
          Forgot your <Link to="/forgotpassword">Password</Link> ?
        </p>
        <p>
          New to Askit ? <Link to="/register">Sign Up</Link>
        </p>
      </BottomContainer>
    </Container>
  );
};

export default Login;
