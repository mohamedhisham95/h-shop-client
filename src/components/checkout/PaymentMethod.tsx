import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Components
import ContainerCenter from "components/layout/ContainerCenter";

// Redux
import { setPaymentMethod } from "redux/checkoutSlice";

type props = {
  setActiveStep: any;
};

const PaymentMethod: React.FC<props> = ({ setActiveStep }) => {
  // Dispatch
  const dispatch = useDispatch();

  // Redux State
  const { payment_method } = useSelector((state: any) => state.checkout);

  // Formik
  const paymentMethodForm: any = useFormik<any>({
    initialValues: {
      payment_method: payment_method,
    },
    validationSchema: Yup.object({
      payment_method: Yup.string().required("Payment method is required"),
    }),
    onSubmit: (values: any) => {
      dispatch(setPaymentMethod(values.payment_method));
      setActiveStep(3);
    },
  });

  return (
    <ContainerCenter>
      <Form onSubmit={paymentMethodForm.handleSubmit}>
        <Form.Group controlId="payment_method">
          <Form.Label>Payment Method</Form.Label>
          <Form.Check
            type="radio"
            label="Stripe"
            value={paymentMethodForm.values.payment_method}
            checked={payment_method === "Stripe"}
            onChange={paymentMethodForm.handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </ContainerCenter>
  );
};

export default PaymentMethod;
