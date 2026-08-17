import css from "./FeaturedPetCard.module.css";
import type { Pet } from "../../types/pet";

type FeaturedPetCardProps = {
  pet: Pet;
};

export const FeaturedPetCard = ({ pet }: FeaturedPetCardProps) => {
  return (
    <div className={css.card}>
      <div className={css.iconWrapper}>
        <img
          src={pet.imgURL}
          alt={`Photo of ${pet.name}`}
          className={css.image}
          width={60}
          height={60}
        />
      </div>

      <div className={css.petInfo}>
        <div className={css.nameBirthday}>
          <p className={css.name}>{pet.name}</p>
          <p className={css.birthday}>
            <span className={css.birthdaySpan}>Birthday:</span> {pet.birthday}
          </p>
        </div>

        <p className={css.description}>{pet.comment}</p>
      </div>
    </div>
  );
};
