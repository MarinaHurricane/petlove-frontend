import css from "./AddPetPage.module.css";
import addPetMobile1x from "../../assets/add-pet-mobile-1x.jpg";
import addPetMobile2x from "../../assets/add-pet-mobile-2x.jpg";
import addPetTablet1x from "../../assets/add-pet-tablet-1x.jpg";
import addPetTablet2x from "../../assets/add-pet-tablet-2x.jpg";
import addPetDesktop1x from "../../assets/add-pet-desktop-1x.jpg";
import addPetDesktop2x from "../../assets/add-pet-desktop-2x.jpg";
import { PetBlock } from "../../components/PetBlock/PetBlock";
import { Title } from "../../components/Title/Title";
import { Icon } from "../../components/Icon/Icon";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addOwnPet, getSpecies } from "../../lib/api/petsPage";
import Select from "react-select";
import toast from "react-hot-toast";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "../../lib/store/authStore";
import { selectStyles } from "../../sevices/reactSelectStyles";
import { ButtonLink } from "../../components/ButtonLink/ButtonLink";

const addPetImages = {
  mobile1x: addPetMobile1x,
  mobile2x: addPetMobile2x,
  tablet1x: addPetTablet1x,
  tablet2x: addPetTablet2x,
  desktop1x: addPetDesktop1x,
  desktop2x: addPetDesktop2x,
};

const schema = yup.object({
  title: yup.string().required("Title is required"),
  name: yup.string().required("Pet's name is required"),
  species: yup.string().required("Species is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
});

type AddPetFormValues = {
  title: string;
  name: string;
  species: string;
  dateOfBirth: string;
  gender: string;
};

type FormValues = yup.InferType<typeof schema>;

export const AddPetPage = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [petAvatar, setPetAvatar] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data: speciesData, isLoading: isSpeciesLoading } = useQuery({
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

  const title = useWatch({
    control,
    name: "title",
  });

  const name = useWatch({
    control,
    name: "name",
  });

  const dateOfBirth = useWatch({
    control,
    name: "dateOfBirth",
  });

  const species = useWatch({
    control,
    name: "species",
  });

  const gender = useWatch({
    control,
    name: "gender",
  });

  const mutation = useMutation({
    mutationFn: addOwnPet,
    onSuccess: (data) => {
      setUser(data.updatedUser);
      toast.success("Pet added successfully");
      navigate("/profile");
    },
    onError: () => {
      toast.error("Adding pet failed, please try again");
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!petAvatar) {
      setAvatarError(true);
      return;
    }

    setAvatarError(false);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    formData.append("avatar", petAvatar);

    mutation.mutate(formData);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.files?.[0];
    if (!avatar) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPetAvatar(avatar);
    setPreview(URL.createObjectURL(avatar));
    setAvatarError(false);
  };

  return (
    <section className={css.addPetSection}>
      <PetBlock
        mode="addPet"
        species="cat"
        images={addPetImages}
        alt="dog in glasses on orange background"
      />
      <div className={css.formWrapper}>
        <Title className={css.title}>Add my pet</Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={css.iconList}>
            <li className={css.iconItemMale}>
              <label htmlFor="male">
                <Icon
                  name="icon-male"
                  className={
                    gender === "male"
                      ? `${css.iconMale} ${css.iconMaleChosen}`
                      : css.iconMale
                  }
                />
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

            <li className={css.iconItem}>
              <label htmlFor="female">
                <Icon
                  name="icon-female"
                  className={
                    gender === "female"
                      ? `${css.iconFemale} ${css.iconFemaleChosen}`
                      : css.iconFemale
                  }
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

            <li className={css.iconItem}>
              <label htmlFor="multiple">
                <Icon
                  name="icon-multiple"
                  className={
                    gender === "multiple"
                      ? `${css.iconMultiple} ${css.iconMultipleChosen}`
                      : css.iconMultiple
                  }
                />
              </label>
              <input
                type="radio"
                id="multiple"
                value="multiple"
                {...register("gender")}
                hidden
              />
            </li>
            {errors.gender && (
              <li className={css.genderError}>{errors.gender.message}</li>
            )}
          </ul>

          {preview ? (
            <div className={css.iconWrap}>
              <img src={preview} alt="pet-avatar" className={css.avatar} />
            </div>
          ) : (
            <div className={css.iconWrap}>
              <Icon name="icon-paw" className={css.defaultAvatar} />
            </div>
          )}

          {avatarError && (
            <p className={css.avatarError}>Pet photo is required</p>
          )}

          <div className={css.inputsWrapper}>
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

            <input
              type="text"
              placeholder="Title"
              {...register("title")}
              className={
                title ? `${css.profileInfo} ${css.filled}` : css.profileInfo
              }
            />
            <input
              type="text"
              placeholder="Pet's name"
              {...register("name")}
              className={
                name ? `${css.profileInfo} ${css.filled}` : css.profileInfo
              }
            />

            <div className={css.birthdayTypeWrapper}>
              <input
                type="date"
                {...register("dateOfBirth")}
                className={
                  dateOfBirth ? ` ${css.filled} ${css.birthday}` : css.date
                }
              />

              {errors.dateOfBirth && (
                <p className={css.error}>{errors.dateOfBirth.message}</p>
              )}

              <Controller
                name="species"
                control={control}
                render={({ field }) => (
                  <Select
                    className={
                      species ? `${css.filled} ${css.species}` : css.select
                    }
                    value={
                      speciesOptions?.find(
                        (option) => option?.value === field.value,
                      ) || null
                    }
                    options={speciesOptions}
                    placeholder="Species"
                    isLoading={isSpeciesLoading}
                    onChange={(option) => field.onChange(option?.value)}
                    styles={selectStyles}
                  />
                )}
              />

              {errors.species && (
                <p className={css.error}>{errors.species.message}</p>
              )}
            </div>
          </div>

          <div className={css.addButtonsList}>
            <ButtonLink to="/profile" className={css.link}>
              Back
            </ButtonLink>
            <Button
              className={css.submit}
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Adding..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
