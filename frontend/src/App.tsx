import { CategoryList } from './components/categories/CategoryList';
import { TaskList } from './components/tasks/TaskList';
import { Toaster } from 'sonner';
import useCategories from './hooks/useCategories';
import { ErrorMessage } from './components/ErrorMessage';
import { InfoButton } from './components/InfoButton';

export default function App() {
  const {
    loadCategories,
    categories,
    categoryFilter,
    updateCategoryFilter,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    loading,
    error,
  } = useCategories();


  if (loading) return <p>Loading…</p>;
  if (error) return <ErrorMessage error={error} onRetry={loadCategories} />;

  return (
    <div className="container">
      <div className="header">
        <h1>My tasks</h1>
        <InfoButton />
      </div>
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
