import { useState, useEffect, useMemo } from "react";
import { fetchTasks, createTask, deleteTask, toggleDone, updateTask } from "../api/tasks";
import { Task } from "../types/task";
import { Category } from "../types/category";


const useTasks = (categories: Category[], categoryFilter: number | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>("");

  const loadTasks = () => {
    fetchTasks()
      .then(setTasks)
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  };

  const reloadTasks = () => {
    setLoading(true);
    setError(null);
    loadTasks();
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => categoryFilter === undefined || task.categoryId === categoryFilter)
      .filter((task) => task.title.toLowerCase().includes(searchFilter.trim().toLowerCase()))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [tasks, categoryFilter, searchFilter]);


  useEffect(() => loadTasks(), [categories]);


  const handleCreateTask = async (title: string, description?: string, categoryId?: number) => {
    try {
      const newTask = await createTask(title.trim(), description, categoryId);
      setTasks((prev) => [...prev, newTask]);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleUpdateTask = async (taskId: number, title: string, description?: string, categoryId?: number) => {
    try {
      const updatedTask = await updateTask(taskId, title.trim(), description, categoryId);
      setTasks((prev) => [...prev.filter((task) => task.id !== taskId), updatedTask])
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleToggleDone = async (taskId: number, done: boolean) => {
    try {
      const updatedTask = await toggleDone(taskId, done);
      setTasks((prev) => [...prev.filter((task) => task.id !== taskId), updatedTask])
    } catch (e) {
      setError((e as Error).message);
    }
  };


  return {
    reloadTasks,
    filteredTasks,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    handleToggleDone,
    searchFilter,
    setSearchFilter,
    loading,
    error
  };
};

export default useTasks;
