import { Modal, Spinner } from "flowbite-react";
import React, { useEffect } from "react";
import Card from "./Card";
import { useDogDetails, useGenerateMatch } from "../api/dog";
import { Dog } from "../types";
import { useFavContext } from "../hooks/useFavContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MatchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { favorites } = useFavContext();
  const { mutateAsync: findMatch, data: matchedId } = useGenerateMatch();
  const { data: dogs = [], isPending: isFetchingDogsPending } = useDogDetails<
    Dog[]
  >(matchedId ? [matchedId] : []);

  useEffect(() => {
    if (favorites.length > 0) {
      findMatch(favorites);
    }
  }, [isOpen, favorites, findMatch]);

  return (
    <Modal size="sm" show={isOpen} onClose={onClose} popup>
      <Modal.Header className="p-6">Your Match!</Modal.Header>
      <Modal.Body className="h-full flex justify-center">
        {dogs.length > 0 && !isFetchingDogsPending ? (
          <Card dog={dogs[0]} />
        ) : (
          <Spinner />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MatchModal;
