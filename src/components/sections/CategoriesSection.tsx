import { getCategories } from '@/lib/queries'
import CategoriesClient from '@/components/sections/CategoriesClient'

const CategoriesSection = async () => {
  const categories = await getCategories()
  return <CategoriesClient categories={categories} />
}

export default CategoriesSection