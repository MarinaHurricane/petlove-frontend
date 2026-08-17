import { useQuery } from "@tanstack/react-query";
import { FeaturedPetCard } from "../FeaturedPetCard/FeaturedPetCard";
import css from "./PetBlock.module.css";
import { getRandomPet } from "../../lib/api/petsPage";

export type PetBlockImages = {
  mobile1x: string;
  mobile2x: string;
  tablet1x: string;
  tablet2x: string;
  desktop1x: string;
  desktop2x: string;
};

type PetBlockProps = {
  images: PetBlockImages;
  alt: string;
  species?: "dog" | "cat";
  mode: "auth" | "addPet";
};

export const PetBlock = ({ images, alt, species, mode }: PetBlockProps) => {
  const { data: pet, isError } = useQuery({
    queryKey: ["randomPet", species],
    queryFn: () => getRandomPet(species),
    refetchInterval: 7 * 1000,
    staleTime: 7 * 1000,
  });

  return (
    <div className={css.petBlock}>
      {!isError && mode === "auth" && pet && <FeaturedPetCard pet={pet} />}

      <picture>
        <source
          media="(min-width: 1280px)"
          srcSet={`${images.desktop1x} 1x, ${images.desktop2x} 2x`}
        />

        <source
          media="(min-width:768px)"
          srcSet={`${images.tablet1x} 1x, ${images.tablet2x} 2x`}
        />

        <img
          className={css.image}
          src={images.mobile1x}
          srcSet={`${images.mobile1x} 1x, ${images.mobile2x} 2x`}
          alt={alt}
        />
      </picture>
    </div>
  );
};
