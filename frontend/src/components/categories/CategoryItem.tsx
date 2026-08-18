import type { Category } from '../../types/category';

interface Props {
  category: Category;
  categoryFilter: number | undefined;
  updateCategoryFilter: (value: number) => void;
}

export function CategoryItem({ category, categoryFilter, updateCategoryFilter }: Props) {
  return (
    <button
      className={`category ${category.id === categoryFilter ? "selected" : ""}`}
      title="Filtrer les tâches"
      onClick={(_) => updateCategoryFilter(category.id)}
    >
      {category.name}
    </button>
  );
}
