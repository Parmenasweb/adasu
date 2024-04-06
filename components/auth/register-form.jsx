"use client";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import CardWrapper from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      setError("Must provide all the credentials");
    }
    try {
      startTransition(async () => {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });
        if (response.ok) {
          const form = e.target;
          form.reset();
          const okResponse = await response.json();
          setSuccess(okResponse.message);
          router.push("/auth/login");
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          console.log("something went wrong");
        }
      });
    } catch (err) {
      isPending(false);
      setError("something went wrong");
    }
  };

  return (
    <CardWrapper
      headerLabel="Sign Up For An Account"
      backButtonLabel="Already have an account? Login"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form>
        <form onSubmit={handleSubmit}>
          <div className=" h-[300px] flex flex-col items-start justify-between">
            <label>UserName</label>
            <Input
              name="name"
              type="text"
              placeholder="john"
              value={userInfo.name}
              onChange={handleChange}
              disabled={isPending}
            />
            <label>Email</label>
            <Input
              name="email"
              type="email"
              placeholder="johndoes@gmail.com"
              value={userInfo.email}
              onChange={handleChange}
              disabled={isPending}
            />
            <label>Create a password</label>
            <Input
              name="password"
              type="password"
              placeholder="*******"
              value={userInfo.password}
              onChange={handleChange}
              disabled={isPending}
            />
          </div>
          <FormError message={Error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full mt-6 ">
            {isPending ? "Registering..." : "Register"}
          </Button>
          <p className="flex items-center mt-4 justify-center">
            or sign up with
          </p>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default RegisterForm;
