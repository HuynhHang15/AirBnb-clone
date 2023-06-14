import { useSelector, useDispatch } from 'react-redux';
import CategoryCard from "./components/CategoryCard";
import { categoriesJson } from "./constants/categories";
import { selectedCategory } from "@/redux/categorySlice";

const Category = () => {
  const categories = categoriesJson;
  const categorySelect = useSelector((state:any) => state.category.selectedCategory);
  const dispatch = useDispatch()

  return (
    <div className="bg-white px-8 md:px-16 flex gap-4 items-center shadow-md overflow-x-auto category">
      {categories?.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          imageUrl={category.imageUrl}
          isSelected={category.name === categorySelect.name}
          handleClick={() => dispatch(selectedCategory(category))}
        />
      ))}
    </div>
  );
};

export default Category;
