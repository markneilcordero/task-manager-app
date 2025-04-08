import React from 'react';

export default function CategoryBadge({ category }) {
  // Set badge class based on the category (you can customize this logic)
  const categoryClass = category.toLowerCase();

  return (
    <span className={`badge bg-${categoryClass} me-2`}>
      {category}
    </span>
  );
}
