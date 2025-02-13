import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useBreeds } from "../api/dog";

export interface Filter {
  ageMin: string;
  ageMax: string;
  breeds: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filter: Filter) => void;
}

const FilterModal: React.FC<Props> = ({ isOpen, onApply, onClose }) => {
  const [filter, setFilter] = useState<Filter>({
    ageMin: "",
    ageMax: "",
    breeds: [],
  });

  const { data: breeds = [] } = useBreeds();

  const handleFilterChange =
    (key: keyof Omit<Filter, "breeds">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleBreedsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBreeds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFilter((prev) => ({ ...prev, breeds: selectedBreeds }));
  };

  const handleFilterSubmit = () => {
    console.log("Filter:", filter);
    onApply(filter);
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header className="p-6">Filter Dogs</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="w-full flex gap-2 items-baseline">
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="min-age" value="Min Age" />
              <TextInput
                id="min-age"
                type="number"
                placeholder="0"
                value={filter.ageMin}
                onChange={handleFilterChange("ageMin")}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="max-age" value="Max Age" />
              <TextInput
                id="max-age"
                type="number"
                placeholder="50"
                value={filter.ageMax}
                onChange={handleFilterChange("ageMax")}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label
              htmlFor="breeds"
              value={`Breeds (${filter.breeds.length} selected)`}
            />
            <Select
              id="breeds"
              className="h-48"
              multiple
              value={filter.breeds}
              onChange={handleBreedsChange}
            >
              {/* Add options for breeds here */}
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="blue" onClick={handleFilterSubmit}>
          Apply
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
