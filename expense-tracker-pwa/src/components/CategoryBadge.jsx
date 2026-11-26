import { getCategoryData } from '../data/categories';

function CategoryBadge({ category }) {
  const { name, color, bgColor, icon: IconComponent } = getCategoryData(category);

  return (
    <span
      className="category-badge"
      style={{
        color,
        backgroundColor: bgColor,
        borderColor: color,
      }}
    >
      {IconComponent && <IconComponent size={15} aria-hidden="true" />}
      <span>{name}</span>
    </span>
  );
}

export default CategoryBadge;