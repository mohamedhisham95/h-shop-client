import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Components
import ContainerCenter from "components/layout/ContainerCenter";

// Redux
import { setShippingAddress } from "redux/checkoutSlice";

type props = {
  setActiveStep: any;
};

const Address: React.FC<props> = ({ setActiveStep }) => {
  // Dispatch
  const dispatch = useDispatch();

  // Redux State
  const { shipping_address } = useSelector((state: any) => state.checkout);

  // Formik
  const addressForm: any = useFormik<any>({
    initialValues: {
      address: shipping_address?.address,
      city: shipping_address?.city,
      postal_code: shipping_address?.postal_code,
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      postal_code: Yup.string().required("Postal code is required"),
    }),
    onSubmit: (values: any) => {
      dispatch(setShippingAddress(values));
      setActiveStep(2);
    },
  });

  return (
    <ContainerCenter>
      <Form onSubmit={addressForm.handleSubmit}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            onChange={addressForm.handleChange}
            onBlur={addressForm.handleBlur}
            value={addressForm.values.address}
            isInvalid={addressForm?.errors?.address}
          />

          {addressForm.touched.address && addressForm.errors.address && (
            <Form.Control.Feedback type="invalid">
              {addressForm.errors.address}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            onChange={addressForm.handleChange}
            onBlur={addressForm.handleBlur}
            value={addressForm.values.city}
            isInvalid={addressForm?.errors?.city}
          />

          {addressForm.touched.city && addressForm.errors.city && (
            <Form.Control.Feedback type="invalid">
              {addressForm.errors.city}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="postal_code">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            onChange={addressForm.handleChange}
            onBlur={addressForm.handleBlur}
            value={addressForm.values.postal_code}
            isInvalid={addressForm?.errors?.postal_code}
          />

          {addressForm.touched.postal_code &&
            addressForm.errors.postal_code && (
              <Form.Control.Feedback type="invalid">
                {addressForm.errors.postal_code}
              </Form.Control.Feedback>
            )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </ContainerCenter>
  );
};

export default Address;
