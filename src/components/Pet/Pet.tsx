import css from './Pet.module.css';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';


export const Pet = ({ pet, onPetClick, onFavClick, variant }) => {
  return (
    <li className={css.pet}>
      <div className={css.petContainer}>
        <img src={pet.imgURL} alt={pet.species} width={287} height={238} className={css.image}/>
        <h3>{pet.title}</h3>
        <dl className={css.petData}>
          <div className={css.petSubData}>
            <dt>Name</dt>
            <dd>{pet.name}</dd>
          </div>
          <div className={css.petSubData}>
            <dt>Birthday</dt>
            <dd>{new Date(pet.birthday).toLocaleDateString("en-GB")}</dd>
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
          <Button onClick={() => onPetClick(pet)} >Learn more</Button>
          {variant === "generalList" ?  <button className={css.addFavourite} onClick={() => onFavClick(pet._id)}>
            <Icon name="icon-heart" className={css.icon} />
          </button> :  <button className={css.addFavourite} onClick={() => onFavClick(pet._id)}>
            <Icon name="icon-trash" className={css.icon} />
          </button>}
         
         
        </div>
      </div>
    </li>
  );
};