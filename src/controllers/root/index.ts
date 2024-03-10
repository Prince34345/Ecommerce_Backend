import { createCategory, deleteCategory, getCategories, updateCategory } from '../../controllers/Category'
import { createFilter, deleteFilter, getFilters, updateFilter } from '../Filter'
import {
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from '../Product'

export const controllers = {
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
}
export const Filtercontrollers = {
  getFilters,
  createFilter,
  deleteFilter,
  updateFilter,
}
export const Categorycontrollers = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory
}

