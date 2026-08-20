import type { OwnPet } from "../../types/ownPet";
import { Icon } from "../Icon/Icon";
import css from "./UserPet.module.css";

type UserPetProps = {
  pet: OwnPet;
  onPetDelete: () => void;
};

export const UserPet = ({ pet, onPetDelete }: UserPetProps) => {
  return (
    <li className={css.userPet}>
      <div className={css.imageWrapper}>
        <img
          src={pet.avatar}
          alt={`${pet.name}'s avatar`}
          className={css.petAvatar}
        />
      </div>
      <div className={css.petInfo}>
        <p className={css.title}>{pet.title}</p>
        <dl className={css.petData}>
          <div className={css.petSubData}>
            <dt className={css.data}>Name</dt>
            <dd className={css.info}>{pet.name}</dd>
          </div>
          <div className={css.petSubData}>
            <dt className={css.data}>Birthday</dt>
            <dd className={css.info}>
              {new Date(pet.dateOfBirth).toLocaleDateString("en-GB")}
            </dd>
          </div>
          <div className={css.petSubData}>
            <dt className={css.data}>Gender</dt>
            <dd className={css.info}>{pet.gender}</dd>
          </div>
          <div className={css.petSubData}>
            <dt className={css.data}>Species</dt>
            <dd className={css.info}>{pet.species}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={onPetDelete}
          className={css.deleteButton}
        >
          <Icon name="icon-trash" className={css.icon} />
        </button>
      </div>
    </li>
  );
};
