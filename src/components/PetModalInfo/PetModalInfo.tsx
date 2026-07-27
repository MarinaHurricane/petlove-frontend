import css from "./PetModalInfo.module.css";
import { Icon } from "../Icon/Icon";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { removePetFromFavorites, viewedPets } from "../../lib/api/user";
import { Button } from "../Button/Button";
import { useAuthStore } from "../../lib/store/authStore";

export const PetModalInfo = ({ pet, variant, onClose }) => {
  const { user } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();
  const isFavorite = user?.favorites?.some(
    (favorite) => favorite._id === pet._id,
  );
  const { data: viewedPet } = useQuery({
    queryKey: ["pet"],
    queryFn: () => viewedPets(pet._id),
  });

  const favoritesMutation = useMutation({
    mutationFn: removePetFromFavorites,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
       onClose();
      setUser(data);
     
    },
  });

  console.log(viewedPet);
  return (
    <div className={css.petContainer}>
      <div className={css.imageWrapper}>
        <img src={pet.imgURL} alt={pet.species} className={css.image} />
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
          <dd className={css.info}>
            {new Date(pet.birthday).toLocaleDateString("en-GB")}
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
        ) : (
          variant === "favorites" && (
            <Button className={css.addFavourite}
            onClick={()=> favoritesMutation.mutate(pet._id)}
           >
              Remove
              <span>
                <Icon
                  name="icon-heart"
                  className={isFavorite ? css.liked : css.icon}
                />
              </span>
            </Button>
          )
        )}

        <Button variant="secondary">Contact</Button>
      </div>
    </div>
  );
};
