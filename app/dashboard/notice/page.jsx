"use client";

import Notification from "@/components/dashboardComps/Notice";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Notifications() {
  async function fetchFinance() {
    const response = await fetch("/api/finance");
    const data = await response.json();
    return data[0].notices;
  }
  const { isLoading, data } = useQuery({
    queryKey: ["finance"],
    queryFn: fetchFinance,
  });

  return (
    <main>
      <Notification notices={data} isLoading={isLoading} />
    </main>
  );
}

export default Notifications;
