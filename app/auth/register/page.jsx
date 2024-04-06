import RegisterForm from "../../../components/auth/register-form";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { Merriweather } from "next/font/google";

const font = Merriweather({
  subsets: ["cyrillic"],
  weight: ["700"],
});

async function RegisterPage() {
  const session = await getServerSession(options);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main
      className={cn(
        " text-white flex items-center justify-center h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800",
        font.className
      )}
    >
      <RegisterForm />
    </main>
  );
}

export default RegisterPage;
