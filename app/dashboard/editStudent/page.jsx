"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import LoadingSpinner from "@/components/loadingspinner";

function EditUser() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const studentId = searchParams.get("id");

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    nationality: "",
    birthday: "",
    department: "",
    contact: "",
  });

  function cleanUp(info) {
    setUserInfo({
      name: "",
      email: "",
      nationality: "",
      birthday: "",
      department: "",
      contact: "",
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!studentId || !userInfo) {
      setError("No student was selected...try again");
    } else {
      // make a post request to the server with the student id received via url
      startTransition(async () => {
        try {
          const response = await fetch(`/api/user?id=${studentId}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userInfo),
          });
          if (response.ok) {
            setSuccess("Student Info updated successfully");
            cleanUp();
          } else {
            setError(
              "Sorry an error occured while updating ... Try again later"
            );
            cleanUp();
          }
        } catch (err) {
          console.error(err.message);
        }
      });
    }
  }

  // ----------- UI -----------------

  return (
    <div className=" container w-[80%] m-auto p-3 col-span-1 h-full flex border-4 rounded-lg flex-col items-center ">
      <h1 className="ml-1 text-xl font-bold">Edit A Student In The Database</h1>
      <form
        onSubmit={handleSubmit}
        action="put"
        className="flex mt-2 flex-col space-y-3"
      >
        <Input
          disabled={isPending}
          className=" p-1"
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          placeholder="enter new name"
        />
        <Input
          disabled={isPending}
          className=" p-1"
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="enter new student email"
        />
        <Input
          disabled={isPending}
          className="p-1"
          type="text"
          name="nationality"
          value={userInfo.nationality}
          onChange={handleChange}
          placeholder="student new nationality"
        />
        <Input
          disabled={isPending}
          className="p-1"
          type="text"
          name="age"
          value={userInfo.birthday}
          onChange={handleChange}
          placeholder="Enter new birthday"
        />
        <Input
          disabled={isPending}
          className="p-1"
          type="text"
          name="department"
          value={userInfo.department}
          onChange={handleChange}
          placeholder="student new department"
        />
        <Input
          disabled={isPending}
          className="p-1"
          type="number"
          name="contact"
          value={userInfo.contact}
          onChange={handleChange}
          placeholder="student new contact"
        />
        <div className="flex flex-col items-center">
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="btn btn-submit items-center w-2/4 py-2 px-5 ml-1 rounded-xl bg-blue-500"
          >
            {isPending ? <LoadingSpinner /> : "Edit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
