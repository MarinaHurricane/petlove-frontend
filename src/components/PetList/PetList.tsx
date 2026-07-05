import css from './PetList.module.css';
import { Pet } from '../Pet/Pet';

export const PetsList = ({ pets, onPetClick}) => {
  return (
    <ul className={css.petsList}>
      {pets?.map((pet) => (
        <Pet key={pet._id} pet={pet} onPetClick={()=>onPetClick(pet)}/>
      ))}
    </ul>
  );
};