import { Dog } from "../types";
import Card from "./Card";

interface Props {
  dogs: Dog[];
}
const CardContainer: React.FC<Props> = ({ dogs }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {dogs.map((dog) => (
        <Card key={dog.id} dog={dog} />
      ))}
    </div>
  );
};
export default CardContainer;
