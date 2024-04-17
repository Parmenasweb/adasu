"use client";

import Activities from "@/components/dashboardComps/Activities";
import DashBoardNews from "@/components/dashboardComps/News";
import Notification from "@/components/dashboardComps/Notice";
import DashboardCard from "@/components/dashboardComps/dashboardCards";
import DashboardTabs from "@/components/dashboardComps/dashboardTab";
import { useEffect, useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import { unstable_noStore as noStore } from "next/cache";

const DashBoard = () => {
  noStore();
  const getFinance = async () => {
    const response = await fetch("/api/finance");
    const data = await response.json();
    console.log(data[0]);
    return data[0];
  };

  const getStudents = async () => {
    const response = await fetch("/api/user");
    const data = await response.json();
    console.log(data);
    return data;
  };

  const financeQuery = useQuery({
    queryKey: ["finnanace"],
    queryFn: getFinance,
  });

  const studentQuery = useQuery({
    queryKey: ["studeeent"],
    queryFn: getStudents,
  });

  return (
    <main>
      <div className="">
        <DashboardCard
          finance={financeQuery.data}
          isFetching={financeQuery.isFetching}
          stFetching={studentQuery.isFetching}
          students={studentQuery.data}
        />
        <DashboardTabs />
        <Activities activities={financeQuery.data?.activities} />
        {/* <DashBoardNews /> */}
        <Notification
          notices={financeQuery.data?.notices}
          isLoading={financeQuery.isLoading}
        />
      </div>
    </main>
  );
};

export default DashBoard;
