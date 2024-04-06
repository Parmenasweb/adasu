"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaRupeeSign } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { useQuery } from "@tanstack/react-query";

export function LoadingActivities() {
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">loading...</TableCell>
        <TableCell className=" ">loading...</TableCell>
        <TableCell className="font-medium  text-right">loading...</TableCell>
      </TableRow>
    </>
  );
}

function Activities() {
  const [activities, setActivities] = useState(null);
  const [filteredActivities, setFilteredActivities] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/api/finance");
        const response = await data.json();
        setActivities(response[0].activities);
        setFilteredActivities(response[0].activities.reverse());
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    // setFilteredActivities(activities);
  }, []);

  function handleClick(e) {
    e.preventDefault();
    setFilteredActivities(
      activities.filter((act) => act.type === e.target.name)
    );
  }

  return (
    <main className="my-5 w-[90%] mx-auto">
      <Card>
        <CardHeader className="flex items-center gap-4">
          <CardTitle>Recent Activities</CardTitle>

          <p className="font-semibold">Sort By: </p>

          <div className="flex items-center justify-between">
            <Button
              name="contribution"
              onClick={handleClick}
              className="ml-auto active:bg-slate-500 "
              size="sm"
            >
              Contributions
            </Button>
            <Button
              name="expenses"
              onClick={handleClick}
              className="ml-auto active:bg-slate-500 "
              size="sm"
            >
              expenses
            </Button>
            <Button
              name="Registration"
              onClick={handleClick}
              className="ml-auto active:bg-slate-500 "
              size="sm"
            >
              Registrations
            </Button>
            <Button
              name="notices"
              onClick={handleClick}
              className="ml-auto active:bg-slate-500 "
              size="sm"
            >
              notices
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <Table>
            <TableCaption>A List of all recent activities... </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Type</TableHead>
                <TableHead className=" w-[50%]">Activity</TableHead>
                <TableHead className="w-[25%] text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!filteredActivities ? (
                <LoadingActivities />
              ) : (
                filteredActivities?.map((act, ind) => {
                  if (act.type === "contribution") {
                    return (
                      <TableRow key={ind}>
                        <TableCell className="font-medium">
                          <FaRupeeSign className=" inline " />
                          {act.type}
                        </TableCell>
                        <TableCell className=" ">
                          {act.studentName} paid{" "}
                          <FaRupeeSign className=" inline " />
                          {act.amount} to the Treasury
                        </TableCell>
                        <TableCell className="font-medium  text-right">
                          {act.date}
                        </TableCell>
                      </TableRow>
                    );
                  }
                  if (act.type === "expenses") {
                    return (
                      <TableRow key={ind}>
                        <TableCell className="font-medium">
                          <FaRupeeSign className=" inline " />
                          {act.type}
                        </TableCell>
                        <TableCell className=" ">
                          {act.purpose} Expenses{" "}
                          <FaRupeeSign className=" inline " />
                          {act.amount}
                        </TableCell>
                        <TableCell className="font-medium  text-right">
                          {act.date}
                        </TableCell>
                      </TableRow>
                    );
                  }
                  if (act.type === "Registration") {
                    return (
                      <TableRow key={ind}>
                        <TableCell className="font-medium">
                          <FaUser className=" inline " />
                          New Registration
                        </TableCell>
                        <TableCell className=" ">
                          Welcome {act.name} From {act.country} to the
                          Institution
                        </TableCell>
                        <TableCell className="font-medium  text-right">
                          {act.date}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

export default Activities;
