import css from "./PetModalInfo.module.css";
import { Icon } from "../Icon/Icon";
import { useQuery } from "@tanstack/react-query";
import { viewedPets } from "../../lib/api/user";

export const PetModalInfo = ({ pet, variant }) => {
  const { data: viewedPet } = useQuery({
    queryKey: ["pet"],
    queryFn: () => viewedPets(pet._id),
  });
  console.log(viewedPet);
  return (
    <div className={css.petContainer}>
      <img src={pet.imgURL} alt={pet.species} />
      <h3>{pet.title}</h3>
      <dl className={css.petData}>
        <div className={css.petSubData}>
          <dt>Name</dt>
          <dd>{pet.name}</dd>
        </div>
        <div className={css.petSubData}>
          <dt>Birthday</dt>
          <dd>{pet.birthday}</dd>
        </div>
        <div className={css.petSubData}>
          <dt>Gender</dt>
          <dd>{pet.gender}</dd>
        </div>
        <div className={css.petSubData}>
          <dt>Species</dt>
          <dd>{pet.species}</dd>
        </div>
        <div className={css.petSubData}>
          <dt>Category</dt>
          <dd>{pet.category}</dd>
        </div>
      </dl>

      <p className={pet.comment}>{pet.comment}</p>
      <p className={css.price}>{pet.price}</p>

      <div className={css.moreInfo}>
        {variant === "viewed" || variant === "generalList" ? (
          <button className={css.addFavourite}>
            Add to{" "}
            <span>
              <Icon name="icon-heart" className={css.icon} />
            </span>
          </button>
        ) : variant === "favorites" &&
        (
          <button className={css.addFavourite}>
            Remove from favorites{" "}
            <span>
              <Icon name="icon-trash" className={css.icon} />
            </span>
          </button>
        )}

        

        <button>Contact</button>
      </div>
    </div>
  );
};
