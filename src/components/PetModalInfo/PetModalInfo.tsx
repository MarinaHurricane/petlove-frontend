import css from "./PetModalInfo.module.css";
import { Icon } from "../Icon/Icon";
import { useQuery } from "@tanstack/react-query";
import { viewedPets } from "../../lib/api/user";
import { Button } from "../Button/Button";

export const PetModalInfo = ({ pet, variant }) => {
  const { data: viewedPet } = useQuery({
    queryKey: ["pet"],
    queryFn: () => viewedPets(pet._id),
  });
  console.log(viewedPet);
  return (
    <div className={css.petContainer}>
      <div className={css.imageWrapper}>
              <img src={pet.imgURL} alt={pet.species} className={css.image}/>
              <span className={css.category}>{pet.category}</span>
      </div>

      <h3 className={css.title}>{pet.title}</h3>
      <dl className={css.petData}>
        <div className={css.petSubData}>
          <dt className={css.data}>Name</dt>
          <dd className={css.info}>{pet.name}</dd>
        </div>
        <div className={css.petSubData}>
          <dt className={css.data}>Birthday</dt>
          <dd className={css.info}>{new Date(pet.birthday).toLocaleDateString("en-GB")}</dd>
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

      <p className={css.comment}>{pet.comment}</p>
      <p className={css.price}>{pet?.price ? `$ ${pet.price}` : ""}</p>

      <div className={css.moreInfo}>
        {variant === "viewed" || variant === "generalList" ? (
          <Button className={css.addFavourite}>
            Add to
            <span>
              <Icon name="icon-heart" className={css.icon} />
            </span>
          </Button>
        ) : variant === "favorites" &&
        (
          <Button className={css.addFavourite}>
            Remove from favorites{" "}
            <span>
              <Icon name="icon-trash" className={css.icon} />
            </span>
          </Button>
        )}

        

        <Button variant="secondary">Contact</Button>
      </div>
    </div>
  );
};
