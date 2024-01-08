import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import Heading from "../components/layout/Heading";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
  firstname: yup
    .string()
    .required("Enter your name")
    .min(3, "Your First name must be at least 3 letters"),
  lastname: yup
    .string()
    .required("Please enter your lastname")
    .min(4, "Your Last name must at least have 4 letters."),
  email: yup
    .string()
    .required("Enter your email address")
    .email("Enter a valid email address"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "Your message should be at least 10 letters"),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  function onSubmit(data) {
    console.log(data);
  }
  console.log(errors);
  return (
    <Layout>
      <Head title="Contact" />
      <Heading content="Contact" />
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <input placeholder="First name" {...register("firstname")} />
        {errors.firstname && <span className="error-message">{errors.firstname.message}</span>}
        <input placeholder="Last name" {...register("lastname")} />
        {errors.lastname && <span className="error-message">{errors.lastname.message}</span>}
        <input placeholder="Email Address" {...register("email")} />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
        <textarea placeholder="Your Message" {...register("message")} />
        {errors.message && <span className="error-message">{errors.message.message}</span>}
        <button className="submit-button">Send</button>
      </form>
    </Layout>
  );
}
