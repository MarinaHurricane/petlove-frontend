import css from './UserPet.module.css';

export const UserPet = ({pet}) => {
    return (
        <>
        <img src={pet.avatar} alt="pet-avatar" className={css.petAvatar}/>
        <p>{pet.title}</p>
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
          </dl>
          <button>delete</button>
        </>
    )

}