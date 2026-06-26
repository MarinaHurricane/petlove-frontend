import css from './Pet.module.css';
import { Icon } from '../Icon/Icon';

export const Pet = ({ pet }) => {
  return (
    <li className={css.pet}>
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
          <button>Learn more</button>
          <button className={css.addFavourite}>
            <Icon name="icon-heart" className={css.icon} />
          </button>
        </div>
      </div>
    </li>
  );
};