import React from 'react'
import { FiSearch } from "react-icons/fi";


const SearchBar = () => {
  return (
    <div className="w-[250px] h-[40px] searchBox relative">
      <FiSearch className="absolute top-[-3px] right-5 mt-3 ml-3 text-gray-400 cursor-pointer" />
      <input
        type="text"
        placeholder="Search..."
        className="w-[100%] h-[100%] p-3 pl-10 text-sm border  border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 "
      />
    </div>
  );
}

export default SearchBar