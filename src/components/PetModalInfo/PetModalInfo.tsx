import css from './PetModalInfo.module.css';
import { Icon } from '../Icon/Icon';

export const PetModalInfo = ({pet}) => {
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
          <button className={css.addFavourite}>Add to <span><Icon name="icon-heart" className={css.icon} /></span></button>
          <button >Contact
            
          </button>
          </div>
         </div>
    )
}