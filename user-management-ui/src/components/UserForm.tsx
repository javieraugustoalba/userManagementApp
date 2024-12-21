import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser } from "../services/UserService";

interface UserFormProps {
  refreshUsers: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ refreshUsers }) => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = async (values: { firstName: string; lastName: string; email: string; role: string }) => {
    await createUser(values);
    refreshUsers();
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        role: "Employee",
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
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Role</label>
            <Field name="role" as="select">
              <option value="Employee">Employee</option>
              <option value="Administrator">Administrator</option>
            </Field>
            <ErrorMessage name="role" component="div" />
          </div>
          <button type="submit">Add User</button>
        </Form>
      )}
    </Formik>
  );
};
