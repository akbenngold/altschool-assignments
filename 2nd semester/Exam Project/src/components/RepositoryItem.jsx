import React from "react";

function RepositoryItem({ repo }) {
  return (
    <div>
      <div>Name: {repo.name}</div>
      {repo.description && <div>Description: {repo.description}</div>}
      <div>Language: {repo.language}</div>
    </div>
  );
}

export default RepositoryItem;
