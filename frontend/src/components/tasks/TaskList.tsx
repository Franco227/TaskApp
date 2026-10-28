import { TaskItem } from './TaskItem';
import { AddTaskButton } from './AddTaskButton';
import { Category } from '../../types/category';
import useTasks from '../../hooks/useTasks';
import { SearchBar } from './SearchBar';

interface Props {
  categories: Category[];
  categoryFilter: number | undefined;
}

export function TaskList({ categories, categoryFilter }: Props) {
  const {
    filteredTasks,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    handleToggleDone,
    searchFilter,
    setSearchFilter,
    loading,
    error,
  } = useTasks(categories, categoryFilter);


  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <SearchBar searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
      <AddTaskButton onCreate={handleCreateTask} categories={categories} defaultCategoryId={categoryFilter} />
      {filteredTasks.length === 0 && <p>No tasks yet.</p>}
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          categories={categories}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          toggleDone={handleToggleDone}
        />
      ))}
    </div>
  );
}
