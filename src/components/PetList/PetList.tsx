import type { Pet as PetType } from "../../types/pet";
import css from "./PetList.module.css";
import { Pet } from "../Pet/Pet";

type PetListProps = {
  pets: PetType[];
  onPetClick: (pet: PetType) => void;
  onFavClick: (id: string) => void;
  variant: "generalList" | "favorites";
  onFavoriteDelete: (id: string) => void;
};

export const PetsList = ({
  pets,
  onPetClick,
  onFavClick,
  variant,
  onFavoriteDelete,
}: PetListProps) => {
  return (
    <ul className={css.petsList}>
      {pets?.map((pet) => (
        <Pet
          key={pet._id}
          pet={pet}
          onPetClick={onPetClick}
          onFavClick={onFavClick}
          variant={variant}
          onFavoriteDelete={onFavoriteDelete}
        />
      ))}
    </ul>
  );
};
