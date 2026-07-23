import css from './Pet.module.css';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { useAuthStore } from '../../lib/store/authStore';


export const Pet = ({ pet, onPetClick, onFavClick, variant, onFavoriteDelete }) => {
  const {user} = useAuthStore();
  // const favorite = user.favorites.includes(pet._id);
  // const viewed = user.viewed.includes(pet._id);

  // const general = !favorite && !viewed;
  return (
    <li className={css.pet}>
      <div className={css.petContainer}>
        <img src={pet.imgURL} alt={pet.species} width={287} height={238} className={css.image}/>
        <div className={css.titleRatingWrapper}>
        <h3 className={css.petTitle}>{pet.title}</h3>
        <div className={css.rating}>
        <Icon name="icon-star" className={css.ratingIcon}/>
        <span>{pet.popularity}</span>
        </div>
        </div>
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
          <div className={css.petSubData}>
            <dt className={css.data}>Category</dt>
            <dd className={css.info}>{pet.category}</dd>
          </div>
        </dl>

        <p className={css.comment}>{pet.comment}</p>
        {pet?.price &&   <p className={css.price}>{`$ ${pet.price}`}</p>}
      

        <div className={css.moreInfo}>
          <Button onClick={() => onPetClick(pet)} >Learn more</Button>
          {variant === "generalList" ?  <button className={css.addFavourite} onClick={() => onFavClick(pet._id)}>
            <Icon name="icon-heart" className={css.icon} />
          </button> : variant === "favorites" ?  <button className={css.addFavourite} onClick={() => onFavoriteDelete(pet._id)}>
            <Icon name="icon-trash" className={css.icon} />
          </button> : ""}
        </div>
           {/* <div className={css.moreInfo}>
          <Button onClick={() => onPetClick(pet)} >Learn more</Button>
          {general ?  <button className={css.addFavourite} onClick={() => onFavClick(pet._id)}>
            <Icon name="icon-heart" className={css.icon} /></button> : favorite ?  <button className={css.addFavourite} onClick={() => onFavoriteDelete(pet._id)}>
            <Icon name="icon-trash" className={css.icon} />
          </button> : ""}
        </div> */}
      </div>
    </li>
  );
};