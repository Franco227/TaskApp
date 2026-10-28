import { useState, useEffect } from "react";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "../api/categories";
import { Category } from "../types/category";


const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = () => {
    setLoading(true);
    setError(null);
    fetchCategories()
      .then(sortCategories)
      .then(setCategories)
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  };

  const sortCategories = (categoryList: Category[]) => {
    categoryList.sort((a, b) => a.name.localeCompare(b.name));
    return categoryList;
  };


  useEffect(() => loadCategories(), []);


  const handleCreateCategory = async (name: string) => {
    try {
      const newCategory = await createCategory(name);
      setCategories((prev) => {
        const updatedCategories = [...prev, newCategory];
        sortCategories(updatedCategories);
        return updatedCategories;
      });
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleUpdateCategory = async (categoryId: number, name: string) => {
    try {
      const updatedCategory = await updateCategory(categoryId, name);
      setCategories((prev) => {
        const updatedCategories = [...prev.filter((category) => category.id !== categoryId), updatedCategory];
        sortCategories(updatedCategories);
        return updatedCategories;
      });
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId);
      setCategories((prev) => prev.filter((category) => category.id !== categoryId));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const updateCategoryFilter = (value: number) => {
    if (value === categoryFilter) {
      setCategoryFilter(undefined);
    } else {
      setCategoryFilter(value);
    }
  };


  return {
    loadCategories,
    categories,
    categoryFilter,
    updateCategoryFilter,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    loading,
    error,
  };
};

export default useCategories;
