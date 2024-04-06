import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FaDollarSign } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { GiAfrica } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
export function FinanceSkeleton() {
  return <Skeleton className="h-4 w-[100px]" />;
}
function DashboardCard({ isFetching, finance, students, stFetching }) {
  // get total revenue: total contributed

  // get total contribution
  const contribution =
    finance &&
    finance.contributions
      .filter((exp) => exp.amount > 0)
      .reduce((acc, exp) => {
        return acc + Number(exp.amount);
      }, 0);

  // get total expenses
  const expenses =
    finance &&
    finance.expenses
      .filter((exp) => exp.amount > 0)
      .reduce((acc, exp) => {
        return acc + Number(exp.amount);
      }, 0);

  // get total students

  // get total countries

  const countries =
    students &&
    new Set(
      students.map((stud) => {
        return stud.nationality;
      })
    );

  return (
    <main>
      <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-2 w-[90%] mx-auto my-7 ">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            -
            <FaRupeeSign className="w-6 h-6 sm:h-5 sm:w-5 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-xl flex items-center justify-start font-bold">
              <FaRupeeSign />+{isFetching ? <FinanceSkeleton /> : contribution}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              total amount contributed
            </p>
          </CardContent>
        </Card>

        {/* ------------------------------------------------ */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            -
            <FaRupeeSign className="w-6 h-6 sm:h-5 sm:w-5 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-xl flex items-center justify-start font-bold">
              <FaRupeeSign />-{!finance ? <FinanceSkeleton /> : expenses}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Total amount spent
            </p>
          </CardContent>
        </Card>

        {/* ------------------------------------------------------------------------- */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Revenue Balance
            </CardTitle>
            -
            <FaRupeeSign className="w-6 h-6 sm:h-5 sm:w-5 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-xl flex items-center justify-start font-bold">
              <FaRupeeSign />+{isFetching ? <FinanceSkeleton /> : finance.total}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              amount at hand
            </p>
          </CardContent>
        </Card>

        {/* ------------------------------------------------------------------------- */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            -
            <FaUsers className="w-6 h-6 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stFetching ? <FinanceSkeleton /> : `+ ${students.length}`}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              DASU total students
            </p>
          </CardContent>
        </Card>

        {/* ------------------------------------------------------------------------- */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Countries
            </CardTitle>
            -
            <GiAfrica className="w-6 h-6 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stFetching ? <FinanceSkeleton /> : countries.size}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              across Africa
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default DashboardCard;
