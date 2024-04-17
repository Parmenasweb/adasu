"use client";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";

function AddNewStudent() {
  const { data: session, status } = useSession();
  console.log(session);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [info, setInfo] = useState({
    name: "",
    email: "",
    nationality: "",
    birthday: "",
    department: "",
    contact: "",
  });
  const [leaderInfo, setLeaderInfo] = useState({
    name: "",
    email: "",
    position: "",
    contact: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleLeaderChange(e) {
    const { name, value } = e.target;
    setLeaderInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function cleanUpInput() {
    setInfo({
      name: "",
      email: "",
      nationality: "",
      birthday: "",
      department: "",
      contact: "",
    });
  }

  function cleanLeaderInput() {
    setLeaderInfo({
      name: "",
      email: "",
      position: "",
      contact: "",
    });
  }

  async function addStudent(info) {
    if (
      !info.name ||
      !info.email ||
      !info.nationality ||
      !info.birthday ||
      !info.department ||
      !info.contact
    ) {
      setError("All Field is required");
    } else {
      startTransition(async () => {
        const res = await fetch(`/api/user`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(info),
        });
        if (res.status === 200) {
          cleanUpInput(info);
          setSuccess("The Student has been added successfully!");
        } else if (res.status === 401) {
          cleanUpInput(info);
          setError("user already exist... YOU CAN ONLY ADD NEW STUDENTS");
        } else {
          cleanUpInput(info);
          setError(
            "An error occurred while trying to add this user... try again later"
          );
        }
      });
    }
  }

  async function addLeader(info) {
    if (!info.name || !info.email || !info.position || !info.contact) {
      setError("All Field is required");
    } else {
      startTransition(async () => {
        const res = await fetch("/api/user?query=addLeader", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(info),
        });
        if (res.status === 200) {
          cleanLeaderInput();
          setSuccess("Leader added successfully");
        } else if (res.status === 500) {
          cleanLeaderInput();
          setError("Leader already exist ");
        } else {
          cleanLeaderInput();
          setError(
            "An error occurred while trying to add this user... try again later"
          );
        }
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    addStudent(info);
  }

  async function handleLeaderSubmit(e) {
    setError("");
    setSuccess("");
    e.preventDefault();
    addLeader(leaderInfo);
  }

  return (
    <div className="w-[80%] m-auto">
      {session?.role === "user" ? (
        <Card className="w-[90%] m-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-lg">
              Add a new student
            </CardTitle>
            <CardDescription className="flex items-center justify-center font-bold">
              Add a new DASU student & Leader to the database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-[100%] m-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">New Student</TabsTrigger>
                <TabsTrigger value="leader">New Leader</TabsTrigger>
              </TabsList>
              <TabsContent value="student">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center">
                      New Student
                    </CardTitle>
                    <CardDescription className="flex items-center justify-center">
                      Add a new student
                    </CardDescription>
                  </CardHeader>
                  <form
                    onSubmit={handleSubmit}
                    action="post"
                    className="flex mt-2 flex-col space-y-3"
                  >
                    <Input
                      className=" px-6 py-3 m-1 border-2"
                      type="text"
                      disabled={isPending}
                      name="name"
                      value={info.name}
                      onChange={handleChange}
                      placeholder="enter new student name"
                    />
                    <Input
                      className="px-6 py-3 m-1 border-2"
                      type="email"
                      disabled={isPending}
                      name="email"
                      value={info.email}
                      onChange={handleChange}
                      placeholder="student email"
                    />
                    <Input
                      className="px-6 py-3 m-1 border-2"
                      type="text"
                      disabled={isPending}
                      name="nationality"
                      value={info.nationality}
                      onChange={handleChange}
                      placeholder="nationality"
                    />
                    <Input
                      className="px-6 py-3 m-1 border-2"
                      type="text"
                      disabled={isPending}
                      name="birthday"
                      value={info.birthday}
                      onChange={handleChange}
                      placeholder="birth month and day (march 12)"
                    />
                    <Input
                      className="px-6 py-3 m-1 border-2"
                      type="text"
                      disabled={isPending}
                      name="department"
                      value={info.department}
                      onChange={handleChange}
                      placeholder="department"
                    />
                    <Input
                      className="px-6 py-3 m-1 border-2"
                      type="text"
                      disabled={isPending}
                      name="contact"
                      value={info.contact}
                      onChange={handleChange}
                      placeholder="contact"
                    />
                    <div className="flex flex-col items-center">
                      <FormError message={error} />
                      <FormSuccess message={success} />
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="btn btn-submit items-center w-[50%] py-3 px-9 ml-1 rounded-xl bg-black"
                      >
                        {isPending ? (
                          <div>
                            <loadingSpinner /> Adding student...
                          </div>
                        ) : (
                          "Add Student"
                        )}
                      </Button>
                    </div>
                  </form>
                </Card>
              </TabsContent>
              <TabsContent value="leader">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center">
                      New Leader
                    </CardTitle>
                    <CardDescription className="flex items-center justify-center">
                      Add a new DASU leader.
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleLeaderSubmit}>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label>Leader name</Label>
                        <Input
                          className="px-6 py-3 m-1 border-2"
                          type="text"
                          disabled={isPending}
                          name="name"
                          value={leaderInfo.name}
                          onChange={handleLeaderChange}
                          placeholder="michael jackson"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Leader Email</Label>
                        <Input
                          onChange={handleLeaderChange}
                          name="email"
                          value={leaderInfo.email}
                          type="email"
                          placeholder="michaejackson20@gmail.com"
                          disabled={isPending}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Leader Position</Label>
                        <Input
                          onChange={handleLeaderChange}
                          name="position"
                          value={leaderInfo.position}
                          type="text"
                          placeholder="G.secretary"
                          disabled={isPending}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Leader contact</Label>
                        <Input
                          onChange={handleLeaderChange}
                          name="contact"
                          value={leaderInfo.contact}
                          type="number"
                          placeholder="6003145147"
                          disabled={isPending}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                      <FormError message={error} />
                      <FormSuccess message={success} />
                      <Button disabled={isPending} type="submit">
                        {isPending ? "Adding Leader..." : "Add Leader"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <>
          <h2>Unauthorized</h2>
          <p>Sorry you dont have the necessary permission </p>
        </>
      )}
    </div>
  );
}

export default AddNewStudent;
