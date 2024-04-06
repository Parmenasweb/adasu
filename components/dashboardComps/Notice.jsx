"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CiMail } from "react-icons/ci";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useState, useTransition } from "react";
import LoadingSpinner from "../loadingspinner";

export function NoticeSkeleton() {
  return (
    <>
      <TableRow>
        <TableCell className=" ">
          <CiMail />
          <div className="bg-gray-300 w-[100px] h-[7px] rounded-md mt-2 animate-pulse" />
          <div className="bg-gray-300 w-[150px] h-[7px] rounded-md mt-2 animate-pulse" />
          <div className="bg-gray-300 w-[200px] h-[7px] rounded-md mt-2 animate-pulse" />
        </TableCell>
        <TableCell className="font-medium  text-right">
          <div className="bg-gray-300 w-[50px] h-[7px] rounded-md mt-2 animate-pulse" />
        </TableCell>
      </TableRow>
    </>
  );
}

function Notification({ notices, isLoading }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();

  const [notice, setNotice] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setNotice((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleClick(e) {
    console.log(e.target.id);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setNotice({
      title: "",
      content: "",
    });
    setError("");
    setSuccess("");
    if (!notice.title || !notice.content) {
      setError("All field is required to publish a notice");
    } else {
      try {
        startTransition(async () => {
          const response = await fetch(`/api/finance?query=notice`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(notice),
          });

          if (response.status === 200) {
            setSuccess("Notice published successfully");
          } else {
            setError(response.error.message);
          }
        });
      } catch (err) {
        setError(err.message);
      }
    }
  }
  return (
    <main className="my-5 w-[93%] mx-auto">
      <h2 className="font-bold flex items-center justify-center text-xl w-[90%] mx-auto my-6">
        Notice Board
      </h2>
      {status === "authenticated" && session.role === "admin" ? (
        <form
          onSubmit={handleSubmit}
          className="w[70%] bg-slate-200 mx-auto my-4 rounded-lg p-6"
        >
          <div className="flex flex-col  justify-between my-6 w-[90%] mx-auto">
            <div className="flex flex-col justify-between ">
              <Label className="my-2 text-lg ">Notice Title</Label>
              <Input
                className="border text-md border-black"
                onChange={handleChange}
                name="title"
                value={notice.title}
                type="text"
                placeholder="Enter the title of the notice"
                disabled={isPending}
              />
            </div>
            <div className="flex flex-col justify-between ">
              <Label className="my-2 text-lg">Notice Content</Label>
              <Textarea
                className="border text-md  border-black"
                onChange={handleChange}
                name="content"
                value={notice.content}
                type="text"
                placeholder="notice content for all student......"
                disabled={isPending}
              />
            </div>
            <div className="flex my-2 flex-col items-center justify-between">
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit">
                {isPending ? <LoadingSpinner /> : "Publish Notice"}
              </Button>
            </div>
          </div>
        </form>
      ) : null}
      <Card>
        <CardHeader className="flex items-center gap-4">
          <CardTitle>All Notice</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <Table>
            <TableCaption>
              Important notices for all students from the leaders{" "}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[75%]">Notice</TableHead>
                <TableHead className="w-[25%] text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <NoticeSkeleton />
              ) : (
                notices?.map((notice, ind) => {
                  return (
                    <TableRow key={ind}>
                      <TableCell className=" ">
                        <CiMail />
                        <h2 className=" line-clamp-2 text-lg font-bold">
                          {notice.title}
                        </h2>
                        <p className=" line-clamp-3 first-letter:uppercase">
                          {notice.content}
                        </p>
                        <Sheet>
                          <SheetTrigger asChild>
                            <button
                              id={ind}
                              className="font-medium underline"
                              onClick={handleClick}
                            >
                              Read more
                            </button>
                          </SheetTrigger>
                          <SheetContent side="right">
                            <div className=" w-[95%] mx-auto mt-4">
                              <h2 className="font-xl text-black-600">
                                Notice Details
                              </h2>
                              <SheetHeader>
                                <SheetTitle className="text-lg">
                                  {notice.title}
                                </SheetTitle>
                                <SheetDescription>
                                  <h2 className=" text-base first-letter:uppercase first-letter:text-3xl first-letter:font-bold">
                                    {notice.content}
                                  </h2>
                                  <p className="mt-5 text-sm">
                                    Date Published: {notice.date}
                                  </p>
                                </SheetDescription>
                              </SheetHeader>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                      <TableCell className="font-medium  text-right">
                        {notice.date}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

export default Notification;
