import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";

// Logo
import logo from "assets/logo.png";

// Components
import ContainerCenter from "components/layout/ContainerCenter";

// API
import { signin } from "api/api";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: ({ email, password }: any) =>
      signin(["signin", { email, password }]),
    onError: (error: any) => {
      console.log(`error : `, error);
    },
    onSuccess: (data) => {
      console.log("data : ", data);
    },
  });

  function handleFormSubmit(data: any) {
    // console.log("data : ", data);
    mutation.mutate({ email: data?.email, password: data?.password });
  }

  return (
    <ContainerCenter>
      <div className="d-flex flex-column align-items-center">
        <img className="mb-4" src={logo} alt="" width="50" height="50" />
        <h5>Please Signin</h5>
      </div>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            isInvalid={!!errors?.email}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            {...register("password", { required: true })}
            isInvalid={!!errors?.password}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </ContainerCenter>
  );
};

export default SignIn;
