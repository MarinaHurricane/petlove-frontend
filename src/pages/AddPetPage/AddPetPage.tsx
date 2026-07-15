import css from "./AddPetPage.module.css";

import addPetMobile1x from "../../assets/add-pet-mobile-1x.jpg";
import addPetMobile2x from "../../assets/add-pet-mobile-2x.jpg";
import addPetTablet1x from "../../assets/add-pet-tablet-1x.jpg";
import addPetTablet2x from "../../assets/add-pet-tablet-2x.jpg";
import addPetDesktop1x from "../../assets/add-pet-desktop-1x.jpg";
import addPetDesktop2x from "../../assets/add-pet-desktop-2x.jpg";
import sprite from "../../../public/icons-sprite.svg";
import { PetBlock } from "../../components/PetBlock/PetBlock";
import { Title } from "../../components/Title/Title";
import { Icon } from "../../components/Icon/Icon";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addOwnPet, getCategories, getSpecies } from "../../lib/api/petsPage";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "../../lib/store/authStore";

type ownPetValues = {
  gender: string;
  title: string;
  name: string;
  avatar: string;
  dateOfBirth: Date;
  species: string;
};

const addPetImages = {
  mobile1x: addPetMobile1x,
  mobile2x: addPetMobile2x,
  tablet1x: addPetTablet1x,
  tablet2x: addPetTablet2x,
  desktop1x: addPetDesktop1x,
  desktop2x: addPetDesktop2x,
};

const schema = yup.object({
  title: yup.string().required(),
  name: yup.string().required(),
  avatar: yup.string(),
  species: yup.string().required(),
  dateOfBirth: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  gender: yup.string().required(),
});

export const AddPetPage = () => {
  const { user } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);
  const [petAvatar, setPetAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [species, setSpecies] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { data: speciesData } = useQuery({
    queryKey: ["speciesData"],
    queryFn: getSpecies,
  });

  const speciesOptions = speciesData?.map((item) => {
    return {
      value: item,
      label: item[0].toUpperCase() + item.slice(1),
    };
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: addOwnPet,
    onSuccess: (data) => {
      console.log(data);
      setUser(data.updatedUser);

      navigate("/profile");
      console.log(data);
    },
    onError: () => setError("Adding pet failed, please try again"),
  });

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();

    Object.entries(data).forEach(([KeyboardEvent, value]) => {
      formData.append(KeyboardEvent, String(value));
    });

    if (petAvatar) {
      formData.append("avatar", petAvatar);
    }

    console.log(formData);
    mutation.mutate(formData);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.files?.[0];
    if (!avatar) return;
    try {
      setPetAvatar(avatar);
      setPreview(URL.createObjectURL(avatar));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PetBlock
        images={addPetImages}
        alt="dog in glasses on orange background"
      />
      <Title>Add my pet</Title>

      <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
        <ul className={css.iconList}>
          <li className={css.iconItemMale}>
            <label htmlFor="male">
              <Icon name="icon-male" className={css.iconMale} />
            </label>

            <input
              type="radio"
              id="male"
              value="male"
              {...register("gender")}
              className={css.radio}
              hidden
            />
          </li>
          {errors.gender && errors.gender.message}

          <li className={css.iconItem}>
            <label htmlFor="female">
              <Icon
                name="icon-female"
                className={`${css.iconFemale} ${css.chosen}`}
              />
            </label>

            <input
              type="radio"
              id="female"
              value="female"
              {...register("gender")}
              hidden
            />
          </li>
          {errors.gender && errors.gender.message}

          <li className={css.iconItem}>
            <label htmlFor="multiple">
              <Icon name="icon-multiple" className={css.iconMultiple} />
            </label>
            <input
              type="radio"
              id="multiple"
              value="multiple"
              {...register("gender")}
              hidden
            />
          </li>
          {errors.gender && errors.gender.message}
        </ul>

        {preview ? (
          <img src={preview} alt="pet-avatar" />
        ) : (
          <div className={css.iconWrap}>
            <Icon name="icon-paw" className={css.defaultAvatar} />
          </div>
        )}

        <label htmlFor="pet-avatar">
          <label htmlFor="avatar" className={css.uploadButton}>
            Upload photo
            <span>
              <Icon name="icon-upload-cloud" className={css.icon} />
            </span>
          </label>

          <input
            id="avatar"
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />
        </label>

        <input type="text" placeholder="Title" {...register("title")} />
        <input type="text" placeholder="Pet's name" {...register("name")} />
        <input type="date" placeholder="Title" {...register("dateOfBirth")} />
        <Controller
          name="species"
          control={control}
          render={({ field }) => (
            <Select
              className={css.select}
              value={
                speciesOptions?.find(
                  (option) => option?.value === field.value,
                ) || null
              }
              options={speciesOptions}
              placeholder="Type of pet"
              onChange={(option) => field.onChange(option?.value)}
            />
          )}
        />

        <div className={css.addButtonsList}>
          <Button className={css.back}>Back</Button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};
