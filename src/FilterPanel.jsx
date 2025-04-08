import React from 'react';

export default function FilterPanel({
  categories = [], // Array of category names
  filter, 
  setFilter, 
  sortBy, 
  setSortBy,
}) {
  // Change filter state based on selected value
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Change sorting state based on selected value
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="card card-body mb-3">
      <h5>Filters & Sorting</h5>
      
      {/* Filter by Status */}
      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          className="form-select"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Filter by Priority */}
      <div className="mb-3">
        <label className="form-label">Priority</label>
        <select
          name="priority"
          value={filter.priority}
          onChange={handleFilterChange}
          className="form-select"
        >
          <option value="all">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Filter by Category */}
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          name="category"
          value={filter.category}
          onChange={handleFilterChange}
          className="form-select"
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Sort by */}
      <div className="mb-3">
        <label className="form-label">Sort By</label>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="form-select"
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
}
