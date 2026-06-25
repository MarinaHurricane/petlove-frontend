import css from './PetList.module.css';
import { Pet } from '../Pet/Pet';

export const PetsList = ({ pets }) => {
  return (
    <ul className={css.petsList}>
      {pets?.map((pet) => (
        <Pet pet={pet} />
      ))}
    </ul>
  );
};