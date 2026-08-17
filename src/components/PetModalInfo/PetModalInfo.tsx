import css from "./PetModalInfo.module.css";
import type { Pet as PetType } from "../../types/pet";
import { Icon } from "../Icon/Icon";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { removePetFromFavorites, viewedPets } from "../../lib/api/user";
import { Button } from "../Button/Button";
import { useAuthStore } from "../../lib/store/authStore";
import { useEffect } from "react";
import { addFavoritePet } from "../../lib/api/petsPage";

type PetModalInfoProps = {
  pet: PetType;
  variant: "viewed" | "generalList" | "favorites";
  onClose: () => void;
};

export const PetModalInfo = ({ pet, variant, onClose }: PetModalInfoProps) => {
  const { user } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();
  const isFavorite = user?.favorites?.some(
    (favorite) => favorite._id === pet._id,
  );
  // const { data: viewedPet } = useQuery({
  //   queryKey: ["pet", pet._id],
  //   queryFn: () => viewedPets(pet._id),
  // });

  const viewedPetMutation = useMutation({
    mutationFn: viewedPets,
  });

  useEffect(() => {
    viewedPetMutation.mutate(pet._id);
  }, [pet._id]);

  const addFavoritesMutation = useMutation({
    mutationFn: addFavoritePet,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      onClose();
      setUser(data);
    },
  });

  const removeFavoritesMutation = useMutation({
    mutationFn: removePetFromFavorites,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      onClose();
      setUser(data);
    },
  });

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
        {!isFavorite ? (
          <Button
            className={css.addFavourite}
            onClick={() => addFavoritesMutation.mutate(pet._id)}
          >
            Add to
            <span>
              <Icon name="icon-heart" className={css.icon} />
            </span>
          </Button>
        ) : (
          <Button
            className={css.addFavourite}
            onClick={() => removeFavoritesMutation.mutate(pet._id)}
          >
            Remove
            <span>
              <Icon
                name="icon-heart"
                className={isFavorite ? css.liked : css.icon}
              />
            </span>
          </Button>
        )}

        <Button variant="secondary">Contact</Button>
      </div>
    </div>
  );
};
