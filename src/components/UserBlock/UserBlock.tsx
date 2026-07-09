import css from './UserBlock.module.css';
import { Icon } from '../Icon/Icon';
import { useAuthStore } from '../../lib/store/authStore';

export const UserBlock = ({onEditClick}) => {
    const {user, isAuthenticated} = useAuthStore();
    return (
        <>
        <div className={css.buttonsWrapper}>
              <div className={css.userIcon}>
            <span className={css.iconText}>User</span>
            <Icon name='icon-user'className={css.icon}/>
         </div>

         <button className={css.editButton} onClick={onEditClick}>
            <Icon name='icon-edit'className={css.editIcon}/>
         </button>
        </div>
       
         <img className={css.avatar} src={user?.avatar} alt="user-avatar" />
         <p>My information</p>
        <div className={css.profileInfo}><p>{user?.name}</p> </div>
         <div className={css.profileInfo}> <p>{user?.email}</p></div>
          <div className={css.profileInfo}> <p>{user?.phone || "+44"}</p></div>

        </>
      
    )
}