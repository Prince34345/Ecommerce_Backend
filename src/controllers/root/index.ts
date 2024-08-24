import { createFavProduct, deleteFavProduct, getFavProducts } from '../TrendingProduct'
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../controllers/Category'
import { createFilter, deleteFilter, getFilters, updateFilter } from '../../controllers/Filter'
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct, getSearchProduct } from '../Product'
import { createUser, deleteUser, getAllUsers, getUser } from '../../controllers/Users'
import { getWishlist, updateWishlist } from '../../controllers/Wishlist'
import { getAddresses, updateAddress } from '../../controllers/Address'

export const ProductController = {
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  getSearchProduct
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
export const Userscontrollers = {
  getUser,
  createUser,
  deleteUser,
  getAllUsers
}

export const wishlistcontrollers = {
  updateWishlist,
  getWishlist,
}

export const Addresscontrollers = {
  updateAddress,
  getAddresses
}