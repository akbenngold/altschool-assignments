import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Repos() {
  const [repos, setRepos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/akbenngold/repos"
        );
        if (!response.ok) {
          throw new Error("fetching data failed");
        }
        const data = await response.json();
        setRepos(data);
      } catch (error) {}
    };

    fetchRepos();
  }, []);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterLanguage(e.target.value);
    setCurrentPage(1);
  };

  const filteredRepos = repos.filter((repo) => {
    return (
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterLanguage === "" || repo.language === filterLanguage)
    );
  });

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

  return (
    <div>
      {/* DISPLAY DETAILS */}
      <Outlet />

      {/* FILTER */}
      <div className="filter">
        <input
          type="search"
          placeholder="Search by repository name..."
          value={searchQuery}
          onChange={handleSearchQuery}
        />

        <select value={filterLanguage} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="JavaScript">JavaScript</option>
        </select>
      </div>

      {/* REPOLIST */}
      <div className="repoList">
        {filteredRepos.slice(startIndex, endIndex).map((repo) => {
          return (
            <h3 key={repo.name}>
              <Link to={`/repos/${repo.name}`} state={{ repo }}>
                {repo.name}
              </Link>
            </h3>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <div>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Repos;
