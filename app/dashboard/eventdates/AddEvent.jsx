"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import LoadingSpinner from "@/components/loadingspinner";

export default function AddNewEvent() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [event, setEvent] = useState({
    title: "",
    date: "",
    description: "",
  });

  function handleChange(e) {
    setEvent((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    startTransition(async () => {
      if (!event.title || !event.date || !event.description) {
        setError("Please fill in all fields");
      } else {
        const res = await fetch("/api/finance?query=addEvent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        });
        const data = await res.json();
        if (res.status === 200) {
          setSuccess(data.success);
          setEvent({
            title: "",
            date: "",
            description: "",
          });
        } else {
          setError(data.message);
        }
      }
    });
  }

  return (
    <main className="w-[80%] mx-auto p-5 my-5 border-2 rounded-md">
      <div className="space-y-4 flex flex-col ">
        <h2 className="text-2xl font-bold tracking-tight">Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="title"
              >
                Event Title
              </label>
              <Input
                name="title"
                value={event.title}
                onChange={handleChange}
                className=""
                disabled={isPending}
                placeholder="event name"
              />
            </div>
            <div className="grid gap-1.5">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="date"
              >
                Date
              </label>
              <Input
                name="date"
                value={event.date}
                onChange={handleChange}
                className=""
                disabled={isPending}
                placeholder="e.g March 30"
                type="text"
              />
            </div>
            <div className="grid gap-1.5">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="description"
              >
                Description
              </label>
              <Textarea
                name="description"
                value={event.description}
                onChange={handleChange}
                className=""
                disabled={isPending}
                placeholder="A short description about the event"
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button className="w-[40%] mx-auto" disabled={isPending}>
              {isPending ? "Creating Event..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
