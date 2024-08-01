import React, { useEffect, useState } from "react";

export default function SearchForm() {
  //React.FormEvent<HTMLFormElement>
  const [searchText, setSearctText] = useState("");

  const handleSearchJob = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearctText(e.target.value);
  };

  useEffect(() => {
    if (!searchText) return;
    const fetchJobsList = async () => {
      try {
        const response = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
        );

        if (!response.ok) throw new Error();
        const data = await response.json();
        console.log(data);
        return data;
      } catch (err) {
        console.error("Something went wrong in fetching jobs list.");
      }
    };
    fetchJobsList();
  }, [searchText]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearctText("");
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        value={searchText}
        type="text"
        required
        placeholder="Find remote developer jobs..."
        onChange={handleSearchJob}
      />
    </form>
  );
}
