import { useFavContext } from "../hooks/useFavContext";
import { Dog } from "../types";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
  dog: Dog;
}
const Card: React.FC<Props> = ({ dog }) => {
  const { favorites, addFavorite, removeFavorite } = useFavContext();
  const isFavorite = favorites.includes(dog.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(dog.id);
    } else {
      addFavorite(dog.id);
    }
  };

  return (
    <div className="h-full bg-white shadow-md rounded-lg">
      <img
        src={dog.img}
        alt={dog.name}
        className="w-full h-64 object-cover rounded-tl-lg rounded-tr-lg"
      />
      <div className="p-4 relative">
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={handleToggleFavorite}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </div>
        <div className="text-lg font-bold">{dog.name}</div>
        <div className="text-gray-600">Breed: {dog.breed}</div>
        <div className="text-gray-600">Age: {dog.age}</div>
        <div className="text-gray-600">Zip Code: {dog.zip_code}</div>
      </div>
    </div>
  );
};
export default Card;
