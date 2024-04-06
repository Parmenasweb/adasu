import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function BirthdaySkeleton() {
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">loading...</TableCell>
        <TableCell className="text-right">loading...</TableCell>
      </TableRow>
    </>
  );
}

export default function BirthdayTable({ students }) {
  return (
    <main>
      <Table>
        <TableCaption>A list of DASU students birthdays.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Student Name</TableHead>
            <TableHead className="text-right">Birthday</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.isPending ? (
            <BirthdaySkeleton />
          ) : (
            students.data?.map((student, ind) => {
              return (
                <TableRow key={ind}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="text-right w-[100px] font-semibold">
                    {student.birthday}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </main>
  );
}
