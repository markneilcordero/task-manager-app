import React from 'react';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor="searchInput" className="form-label">Search Tasks</label>
      <input
        type="text"
        id="searchInput"
        value={searchQuery}
        onChange={handleSearchChange}
        className="form-control"
        placeholder="Search by title or description..."
      />
    </div>
  );
}
