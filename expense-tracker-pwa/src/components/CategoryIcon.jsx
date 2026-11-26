import React from 'react';
import { getCategoryData } from '../data/categories';
import CategoryIcon from './CategoryIcon';

export default function CategoryBadge({ category, size = 16 }) {
  const categoryData = getCategoryData(category);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        borderRadius: '999px',
        fontSize: '0.8rem',
        fontWeight: 600,
        color: categoryData.color,
        backgroundColor: categoryData.bgColor,
      }}
    >
      <CategoryIcon category={categoryData.name} size={size} />
      <span>{categoryData.name}</span>
    </span>
  );
}