import css from './AddPetModal.module.css';

import addPetMobile1x from "../../assets/add-pet-mobile-1x.jpg";
import addPetMobile2x from "../../assets/add-pet-mobile-2x.jpg";
import addPetTablet1x from "../../assets/add-pet-tablet-1x.jpg";
import addPetTablet2x from "../../assets/add-pet-tablet-2x.jpg";
import addPetDesktop1x from "../../assets/add-pet-desktop-1x.jpg";
import addPetDesktop2x from "../../assets/add-pet-desktop-2x.jpg";
import { PetBlock } from '../PetBlock/PetBlock';
import { Title } from '../Title/Title';
import { Icon } from '../Icon/Icon';

const addPetImages = {
      mobile1x: addPetMobile1x,
  mobile2x: addPetMobile2x,
  tablet1x: addPetTablet1x,
  tablet2x: addPetTablet2x,
  desktop1x: addPetDesktop1x,
  desktop2x: addPetDesktop2x,
}

export const AddPetModal = () => {
    return (
        <>
        <PetBlock images={addPetImages} alt="dog in glasses on orange background"/>
        <Title>Add my pet</Title>

        <div className={css.iconList}>
    <label htmlFor="male">
            <Icon name="icon-male" className={css.iconMale}/>
        </label>

        <input type="radio"
        id="male"
        className={css.radio}
        hidden
        />

         <label htmlFor="female">
            <Icon name="icon-female" className={`${css.iconFemale} ${css.chosen}`}/>
        </label>

          <input type="radio"
        id="female"
        hidden
        />
          <label htmlFor="multiple">
            <Icon name="icon-multiple" className={css.iconMultiple}/>
        </label>
          <input type="radio"
        id="multiple"
        hidden
        />
        </div>

    
        </>
        

    )
}