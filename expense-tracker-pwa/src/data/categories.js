import {
  IoFastFoodOutline,
  IoCarOutline,
  IoReceiptOutline,
  IoEllipsisHorizontalCircleOutline,
} from 'react-icons/io5';

export const CATEGORIES = [
  { id: 'comida', name: 'Comida', color: '#ef4444', bgColor: '#fef2f2', icon: IoFastFoodOutline },
  { id: 'transporte', name: 'Transporte', color: '#0ea5e9', bgColor: '#f0f9ff', icon: IoCarOutline },
  { id: 'servicios', name: 'Servicios', color: '#f59e0b', bgColor: '#fffbeb', icon: IoReceiptOutline },
];

export const DEFAULT_CATEGORY = {
  id: 'otros',
  name: 'Otros',
  color: '#64748b',
  bgColor: '#f1f5f9',
  icon: IoEllipsisHorizontalCircleOutline,
};

export function getCategoryData(categoryName) {
  if (!categoryName) return DEFAULT_CATEGORY;
  const normalized = String(categoryName).trim().toLowerCase();
  return (
    CATEGORIES.find(
      (cat) => cat.name.toLowerCase() === normalized || cat.id.toLowerCase() === normalized
    ) || { ...DEFAULT_CATEGORY, name: categoryName }
  );
}