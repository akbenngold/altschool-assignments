import React from "react";
import { useLocation } from "react-router-dom";

function RepoDetails() {
  const location = useLocation();
  const { repo } = location.state || {};

  if (!repo) {
    return <div>No repository details found.</div>;
  }

  return (
    <div>
      {console.log(repo)}
      <h2>{repo.name}</h2>
      <p>Description: {repo.description}</p>
      <p>Language: {repo.language}</p>

      {/* Render other details as needed */}
    </div>
  );
}

export default RepoDetails;
