"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import UserCard from "@/components/User";

function SearchStudent() {
  const [name, setName] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);

  function handleSearchChange(e) {
    setName(e.target.value);
  }

  async function fetchSpecificStudent() {
    try {
      const response = await fetch(`/api/user?studentName=${name}`);
      const data = await response.json();
      if (response.status === 401) {
        setName("");
        alert(
          "sorry this user doesnt exist in the database... Check Your Input"
        );
      } else {
        setSearchedUser(data);
        setName("");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();

    if (!name || name === "") {
      alert("please Enter a valid Name");
    } else {
      fetchSpecificStudent();
    }
  }

  return (
    <div className="grid-2 col-start-2 w-full flex border-4 rounded-lg flex-col items-center">
      <h2 className="ml-1 text-xl font-bold">Search For A Student(By Name)</h2>
      <form className="flex flex-col space-y-3">
        <input
          onSubmit={(e) => e.preventDefault()}
          className=" p-1 mt-3"
          type="text"
          name="name"
          value={name}
          onChange={handleSearchChange}
          placeholder="enter student Name"
        />
        <div className="flex flex-row items-center">
          <button
            onClick={handleSearchSubmit}
            type="submit"
            className="btn btn-submit items-center w-2/4 py-2 px-5 ml-1 rounded-xl bg-blue-500"
          >
            Search
          </button>
        </div>
      </form>
      <br />
      {searchedUser ? (
        <div>
          <UserCard student={searchedUser} />
        </div>
      ) : (
        <>
          <h2>waiting fr ur input ...</h2>
          <div className="bg-gray-300 w-72 h-96 rounded-md mt-2 animate-pulse" />
        </>
      )}
    </div>
  );
}

export default SearchStudent;
