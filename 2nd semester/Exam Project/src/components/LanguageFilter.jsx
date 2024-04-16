import React from "react";

function LanguageFilter({ value, onChange }) {
  return (
    <select value={value} onChange={onChange}>
      <option value="">All</option>
      <option value="JavaScript">JavaScript</option>
      <option value="HTML">HTML</option>
      <option value="CSS">CSS</option>
      <option value="TypeScript">TypeScript</option>
      {/* Add other languages as options */}
    </select>
  );
}

export default LanguageFilter;
