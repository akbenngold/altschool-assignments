import React from "react";
import RepositoryItem from "./RepositoryItem";

function RepositoryList({ repos }) {
  return (
    <div>
      {repos.map((repo) => (
        <div key={repo.id}>
          <RepositoryItem repo={repo} />
        </div>
      ))}
    </div>
  );
}

export default RepositoryList;
