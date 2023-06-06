import React from "react";

type SearchInputProps = {
  placeholder: string;
};

const SearchInput = ({ placeholder }: SearchInputProps) => (
  <input
    type="text"
    placeholder={placeholder}
    className="mb-4 text-black w-[94%] md:mb-0 flex m-auto pl-4 border-2 rounded-md"
  />
);

export default SearchInput;
