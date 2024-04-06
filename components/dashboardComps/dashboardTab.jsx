"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DisplayLeaders from "./displayLeaders";
import DisplayStudents from "./displayStudents";
import { useQuery } from "@tanstack/react-query";

function DashboardTabs({ isFetching }) {
  const fetchAllLeaders = async () => {
    const data = await fetch("/api/user?query=getLeader");
    const response = await data.json();
    return response;
  };

  const fetchAllStudents = async () => {
    const data = await fetch("/api/user");
    const response = await data.json();
    return response;
  };

  const students = useQuery({
    queryKey: ["students"],
    queryFn: fetchAllStudents,
  });

  const leaders = useQuery({
    queryKey: ["leaders"],
    queryFn: fetchAllLeaders,
  });
  return (
    <main className="my-7 w-[93%] mx-auto">
      <div className="DashboardTabHeader">
        <div className="tab-triggers border shadow-sm rounded-lg ">
          <Tabs defaultValue="leaders">
            <TabsList className="flex gap-4 overflow-auto shrink-0">
              <TabsTrigger value="leaders">Leaders</TabsTrigger>
              <TabsTrigger value="All-Students">All Students </TabsTrigger>
              <TabsTrigger value="Imp-dates">Imp Dates</TabsTrigger>
            </TabsList>

            <div className="tab-contents">
              <TabsContent value="leaders">
                <div className=" p-2 ">
                  <DisplayLeaders
                    isPending={leaders.isPending}
                    leaders={leaders.data}
                    error={leaders.isError}
                  />
                </div>
              </TabsContent>
              <TabsContent value="All-Students">
                <div className="py-2">
                  <DisplayStudents
                    isPending={students.isPending}
                    students={students.data}
                    error={students.isError}
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </main>
  );
}

export default DashboardTabs;
