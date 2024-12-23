import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser } from "../services/UserService";
import { UserTypes } from "../enums/UserTypes";

interface UserFormProps {
  refreshUsers: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ refreshUsers }) => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
    .required("Password is required"),
  });

  const handleSubmit = async (values: { id: string; firstName: string; lastName: string; email: string; 
    address: string, phoneNumber: string, country: string, city: string, password: string, userType: string }) => {
    const userPayload = {
      ...values,
      userType: values.userType === "Employee" ? "Employee" : "Administrator",
    };
    await createUser(userPayload);
    refreshUsers();
  };

  return (
    <Formik
      initialValues={{
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        country: "",
        city: "",
        password: "",
        userType: UserTypes.Employee,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div>
            <label>First Name</label>
            <Field name="firstName" />
            <ErrorMessage name="firstName" component="div" />
          </div>
          <div>
            <label>Last Name</label>
            <Field name="lastName" />
            <ErrorMessage name="lastName" component="div" />
          </div>
          <div>
            <label>Address</label>
            <Field name="address"  />
            <ErrorMessage name="address" component="div" />
          </div>
          <div>
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <label>Country</label>
            <Field name="country" />
            <ErrorMessage name="country" component="div" />
          </div>
          <div>
            <label>City</label>
            <Field name="city" />
            <ErrorMessage name="city" component="div" />
          </div>
          <div>
            <label>Role</label>
            <Field name="userType" as="select">
              <option value="Employee">Employee</option>
              <option value="Administrator">Administrator</option>
            </Field>
            <ErrorMessage name="userType" component="div" />
          </div>
          <button type="submit">Add User</button>
        </Form>
      )}
    </Formik>
  );
};
