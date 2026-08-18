import { Category } from '../../types/category';
import { AddCategoryButton } from './AddCategoryButton';
import { CategoryItem } from './CategoryItem';
import { ManageCategoriesButton } from './ManageCategoriesButton';

interface Props {
  categories: Category[];
  categoryFilter: number | undefined;
  updateCategoryFilter: (value: number) => void;
  onCreate: (name: string) => void;
  onUpdate: (categoryId: number, name: string) => void;
  onDelete: (categoryId: number) => void;
}

export function CategoryList({ categories, categoryFilter, updateCategoryFilter, onCreate, onUpdate, onDelete }: Props) {

  return (
    <div>
      <h2>Catégories</h2>
      <div className="categories-section-container">
        <div className="categories-container">
          {categories.length === 0 && <div>Aucune catégorie pour le moment.</div>}
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              categoryFilter={categoryFilter}
              updateCategoryFilter={updateCategoryFilter}
            />
          ))}
        </div>
        <div className="buttons-section">
          <AddCategoryButton onCreate={onCreate} />
          <ManageCategoriesButton categories={categories} onDelete={onDelete} onUpdate={onUpdate} />
        </div>
      </div>
    </div>
  );
}
