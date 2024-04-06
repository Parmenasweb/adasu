import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
}

export default function DisplayLeaders({ isPending, leaders, error }) {
  if (isPending) return <SkeletonCard />;
  if (error) return <p>error occurred while getting leaders...</p>;

  return (
    <main className=" grid gap-3 sm:gap-3 grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-[90%] mx-auto my-7 sm:my-4">
      {leaders.map((leader, ind) => {
        return (
          <Card key={ind} className="w-[95%] mx-auto pb-5">
            <CardContent className="p-0 flex flex-col justify-between">
              <CardHeader className=" font-bold text-sm">
                ({leader.position})
              </CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="ml-2">
                  <AvatarImage
                    alt="Avatar"
                    className="rounded-full"
                    height="64"
                    src="https://img.freepikg.com/premium-vector/3d-simple-user-icon-isolated_169241-7120.jpg?w=1000"
                    // style={{
                    //   aspectRatio: "64/64",
                    //   objectFit: "cover",
                    // }}
                    width="64"
                  />
                  <AvatarFallback className="font-semibold">
                    {leader.name.at(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-between text-sm">
                  <h3 className="font-semibold">{leader.name}</h3>
                  <p className="text-sm text-gray-500 w-[90%] mx-auto">
                    {leader.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </main>
  );
}
