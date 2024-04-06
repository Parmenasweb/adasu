import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/horns-helmet-on-viking-template-10000ld.png";
import { IoClose } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { signOut } from "next-auth/react";
import { RxDashboard } from "react-icons/rx";
import { RiUserAddFill } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";
import { LuFootprints } from "react-icons/lu";

function NavBar(props) {
  return (
    <nav className=" w-[100%]  flex flex-col h-screen bg-black">
      <div className=" header flex w-[80%] mx-auto my-3 justify-between items-center">
        <Image
          className="rounded-full w-12 h-12"
          src={Logo}
          alt="company-logo"
          width={50}
          height={50}
        />
        <h1 className="font-bold text-white text-xl">DASU</h1>
        {props.showMenu && (
          <IoClose
            className="text-white text-3xl cursor-pointer"
            onClick={props.toggleMenu}
          />
        )}
      </div>
      <ul className="flex h-full w-full  justify-between flex-col ">
        <div className="one flex  flex-col justify-between items-center mt-4 text-white">
          <Link
            href="/dashboard"
            className="flex hover:bg-slate-600 items-center justify-center  w-full font-bold py-2"
          >
            <RxDashboard className="text-xl" />
            <li className=" font-bold px-2 py-[5px]"> Dashboard</li>
          </Link>
          <Link
            href="/dashboard/addStudent"
            className="flex hover:bg-slate-600 items-center justify-center  w-full font-bold py-2"
          >
            <RiUserAddFill className="text-xl" />
            <li className=" font-bold px-2 py-[5px]">Add Student</li>
          </Link>
          <Link
            href="/dashboard/allStudents"
            className="flex hover:bg-slate-600 items-center justify-center  w-full font-bold py-2"
          >
            <FiUsers className="text-xl" />
            <li className=" font-bold px-2 py-[5px]">All Students</li>
          </Link>
          <Link
            href="/dashboard/finances"
            className="flex hover:bg-slate-600 items-center justify-center  w-full font-bold py-2"
          >
            <FaMoneyBillTransfer className="text-xl" />
            <li className=" font-bold px-2 py-[5px]">Finances</li>
          </Link>
          <Link
            href="/dashboard/activities"
            className="flex hover:bg-slate-600 items-center justify-center  w-full font-bold py-2"
          >
            <LuFootprints className="text-xl" />
            <li className=" font-bold px-2 py-[5px]">Activities</li>
          </Link>
          <Link
            href="/dashboard/news"
            className="flex hover:bg-slate-600 items-center justify-center  w-full font-bold py-2"
          >
            <li className=" font-bold px-2 py-[5px]">News</li>
          </Link>
          <Link
            href="/dashboard/notice"
            className="flex hover:bg-slate-600 items-center justify-center  w-full font-bold py-2"
          >
            <AiFillNotification className="text-xl" />
            <li className=" font-bold px-2 py-[5px]">Notice</li>
          </Link>
          <Link
            href="/dashboard/eventdates"
            className="flex hover:bg-slate-600 items-center justify-center  w-full font-bold py-2"
          >
            <MdEventAvailable className="text-xl" />
            <li className=" font-bold px-2 py-[5px]">Events</li>
          </Link>
        </div>

        {/* ------------------------------- */}

        <div className="auth mb-2 text-white">
          <Link
            href="#"
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="flex hover:bg-slate-600 items-center justify-center  w-full font-bold "
          >
            <MdLogout />
            <li className=" font-bold px-2 py-[5px]">Logout</li>
          </Link>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
