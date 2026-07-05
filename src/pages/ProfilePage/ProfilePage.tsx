import css from './ProfilePage.module.css';
import { useAuthStore } from '../../lib/store/authStore';
import { UserBlock } from '../../components/UserBlock/UserBlock';

export const ProfilePage = () => {
    const {user, isAuthenticated} = useAuthStore();
    const setUser = useAuthStore((state) => state.setUser)
    return (
        <>
        <UserBlock/>
         {/* <h1>Profile</h1>
         <img className={css.avatar} src={user.avatar} alt="user-avatar" />
         <p>My information</p>
        <div className={css.profileInfo}>{user.name}</div>
         <div className={css.profileInfo}>{user.email}</div>
          <div className={css.profileInfo}>{user.phone? user.phone : "+44"}</div> */}

        </>
      
    )
}