import { ICategoryCardProps } from "@/types/types";

const CategoryCard = ({ name, imageUrl, isSelected= false, handleClick }: ICategoryCardProps) => {
    return (
    <button onClick={handleClick} className={`py-1 md:py-3 mt-1 border-b-2 border-solid ${isSelected ? "border-black" : "border-transparent hover:border-gray-300"}`}>
      <div className="w-28 md:w-40 flex flex-col items-center gap-1 text-gray-500">
        <div className="w-[24px] h-[24px]"><img src={imageUrl} alt={name}/></div>
        <div className={`text-sm font-medium ${isSelected ? "text-black" : "text-gray-500"}`}>{name}</div>
      </div>
    </button>
  );
};

export default CategoryCard;
