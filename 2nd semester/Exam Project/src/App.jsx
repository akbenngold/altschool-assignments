import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/akbenngold/repos",
          {
            headers: {
              Authorization: "Bearer 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",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Fetching Repo Failed");
        }

        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.log("error getting repos", error);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(repos.length / itemsPerPage));
  }, [repos, itemsPerPage]);

  const filteredRepos = repos.filter((repo) => {
    return (
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterLanguage === "" || repo.language === filterLanguage)
    );
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterLanguage(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search by repository name..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <select value={filterLanguage} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="JavaScript">JavaScript</option>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="TypeScript">TypeScript</option>
        {/* Add other languages as options */}
      </select>
      {filteredRepos.slice(startIndex, endIndex).map((repo) => {
        return (
          <div key={repo.id}>
            Name: {repo.name}
            <br />
            {repo.description ? (
              <div>Description: {repo.description}</div>
            ) : null}
            Language: {repo.language}
          </div>
        );
      })}
      <button
        onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </>
  );
}

export default App;
