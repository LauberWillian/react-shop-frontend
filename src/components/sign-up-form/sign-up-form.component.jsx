import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = formFields;
    if (password.value !== confirmPassword.value) {
      alert("Inputs dont match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      document.getElementByClassName("sign-up-form").reset();
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert(error.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  return (
    <div className="sign-up-form sing-up-container">
      <h2>Don't have an account?</h2>
      <h1>Sign Up</h1>
      <form>
        <FormInput
          label="Display Name"
          type="text"
          onChange={handleChange}
          name="displayName"
          required
        ></FormInput>

        <FormInput
          label="E-mail"
          type="email"
          onChange={handleChange}
          name="email"
          required
        ></FormInput>

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          required
        ></FormInput>

        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          required
        ></FormInput>
        <Button type="action" onClick={handleSubmit}>
          Sign-up
        </Button>
      </form>
    </div>
  );
};
export default SignUpForm;
