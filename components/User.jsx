"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  // FaFacebook,
  // FaTwitter,
  // FaInstagram,
  // FaYoutube,
  // FaHeart,
  // FaShare,
  // FaComment,
  FaUser,
} from "react-icons/fa";

function UserCard(props) {
  const router = useRouter();
  const [id, setId] = useState("");

  useEffect(() => {
    setId(props.student._id);
  }, [props.student._id]);

  return (
    <div className=" top m-2 card w-72 h-96 flex items-center flex-col rounded-lg bg-slate-300 justify-around">
      <div className=" bg-slate-700 h-1/4 w-full flex rounded-lg  mb-6">
        <div className="background-img rounded-lg h-full w-full bg-blue-500 flex items-start relative justify-center">
          <FaUser className=" h-24 w-24 rounded-full border-2 border-blue-500 absolute -bottom-12 bg-gray-400 m-4" />
        </div>
      </div>
      <div className="details mt-2 mb-4 w-11/12 h-3/5 flex flex-col items-center justify-between ">
        <div className="userTitle flex items-start mt-5 justify-center flex-col">
          <h3 className=" font-semibold">
            <span className="font-bold text-lg">Name: </span>{" "}
            {props.student.name}
          </h3>
          <h3 className=" font-semibold ">
            <span className="font-bold text-lg">Email: </span>{" "}
            {props.student.email}
          </h3>
          <h3 className=" font-semibold">
            <span className="font-bold text-lg">Nationality: </span>
            {props.student.nationality}
          </h3>
          <h3 className=" font-semibold">
            <span className="font-bold text-lg">Department: </span>
            {props.student.department}
          </h3>
          <h3 className=" font-semibold">
            <span className="font-bold text-lg">Contact: </span>{" "}
            {props.student.contact}
          </h3>
        </div>
        <div className="CTA w-full flex items-center justify-between">
          <Button
            onClick={() => {
              router.push(`/dashboard/editStudent?id=${id}`);
            }}
            className="btn text-sm py-3 bg-blue-500"
          >
            Edit student
          </Button>
          <Button
            onClick={() => {
              router.push(`/dashboard/deleteStudent?id=${id}`);
            }}
            className="btn text-sm py-3 bg-blue-500"
          >
            Delete student
          </Button>
        </div>
      </div>
      {/* ------------------------------------ */}
    </div>
  );
}

export default UserCard;
