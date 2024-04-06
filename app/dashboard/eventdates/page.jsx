"use client";
import BirthdayTable from "./birthday-table";
import AddNewEvent from "./AddEvent";
import { useQuery } from "@tanstack/react-query";

function EventSkeleton() {
  return (
    <div className="flex border-2 rounded-md flex-col space-y-4 p-5">
      <div className="bg-gray-300 w-[100px] h-[5px] rounded-md mt-3 animate-pulse" />
      <div className="bg-gray-300 w-[150px] h-[5px] rounded-md mt-3 animate-pulse" />
      <div className="bg-gray-300 w-[200px] h-[5px] rounded-md mt-3 animate-pulse" />
    </div>
  );
}

async function fetchFinance() {
  const response = await fetch("/api/finance");
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return "An error occurred";
  }
}
async function fetchStudents() {
  const response = await fetch("/api/user");
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return "An error occurred";
  }
}

export function Events() {
  const finance = useQuery({
    queryKey: ["events"],
    queryFn: fetchFinance,
  });
  const students = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });
  return (
    <main className="w-[90%] mx-auto my-5">
      <div className="space-y-4">
        <h2 className="text-2xl w-[80%] font-bold ">
          DASU official Event Days
        </h2>
        <div className="grid gap-6">
          {finance.isPending ? (
            <EventSkeleton />
          ) : (
            finance.data[0].events.map((event, ind) => {
              return (
                <div
                  key={ind}
                  className="flex border-2 rounded-md flex-col space-y-1 p-5"
                >
                  <h2 className="text-xl font-bold tracking-wide">
                    {event.date}: {event.title}
                  </h2>
                  <p className="text-md font-medium leading-2">
                    {event.description}
                  </p>
                </div>
              );
            })
          )}
        </div>
        <h2 className="text-2xl mx-auto my-5 w-[85%] font-bold">
          DASU Non-official Dates(birthdays)
        </h2>
        <BirthdayTable students={students} />
      </div>
    </main>
  );
}

export default function EventPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Events />
      <AddNewEvent />
    </div>
  );
}
