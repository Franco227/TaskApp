import { CategoryList } from './components/categories/CategoryList';
import { TaskList } from './components/tasks/TaskList';
import { Toaster } from 'sonner';
import useCategories from './hooks/useCategories';

export default function App() {
  const {
    categories,
    categoryFilter,
    updateCategoryFilter,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    loading,
    error,
  } = useCategories();


  if (loading) return <p>Chargement…</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

  return (
    <div className="container">
      <h1>Mes tâches</h1>
      <CategoryList
        categories={categories}
        categoryFilter={categoryFilter}
        updateCategoryFilter={updateCategoryFilter}
        onCreate={handleCreateCategory}
        onUpdate={handleUpdateCategory}
        onDelete={handleDeleteCategory}
      />
      <div className="separator" />
      <TaskList categories={categories} categoryFilter={categoryFilter} />
      <Toaster />
    </div>
  );
}
