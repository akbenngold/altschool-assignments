import React from "react";

function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by repository name..."
      value={value}
      onChange={onChange}
    />
  );
}

export default SearchInput;
