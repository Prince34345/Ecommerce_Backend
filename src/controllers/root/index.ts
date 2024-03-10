import { createFavProduct, deleteFavProduct, getFavProducts } from '../../controllers/favProduct'
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../controllers/Category'
import { createFilter, deleteFilter, getFilters, updateFilter } from '../../controllers/Filter'
import { createProduct,deleteProduct,getAllProducts,getProduct,updateProduct} from '../Product'

export const controllers = {
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  createProduct
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
export const Favouritecontrollers = {
  getFavProducts,
  createFavProduct,
  deleteFavProduct,
}

