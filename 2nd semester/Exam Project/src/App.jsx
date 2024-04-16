// App.js
import React, { useEffect, useState } from "react";
import SearchInput from "./components/SearchInput";
import LanguageFilter from "./components/LanguageFilter";
import RepositoryList from "./components/RepositoryList";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
            headers: {},
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
    <div className="container">
      <SearchInput value={searchQuery} onChange={handleSearchChange} />
      <LanguageFilter value={filterLanguage} onChange={handleFilterChange} />
      <RepositoryList
        repos={filteredRepos.slice(startIndex, endIndex)}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredRepos.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default App;
