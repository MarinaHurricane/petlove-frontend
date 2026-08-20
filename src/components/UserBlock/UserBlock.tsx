import css from "./UserBlock.module.css";
import { Icon } from "../Icon/Icon";
import { useAuthStore } from "../../lib/store/authStore";

type UserBlockProps = {
  onEditClick: () => void;
};

export const UserBlock = ({ onEditClick }: UserBlockProps) => {
  const { user } = useAuthStore();

  if (!user) return null;
  return (
    <>
      <div className={css.buttonsWrapper}>
        <div className={css.userIcon}>
          <span className={css.iconText}>User</span>
          <Icon name="icon-user" className={css.icon} />
        </div>

        <button type="button" className={css.editButton} onClick={onEditClick}>
          <Icon name="icon-edit" className={css.editIcon} />
        </button>
      </div>

      <img className={css.avatar} src={user.avatar} alt="User avatar" />
      <p className={css.myInfoTitle}>My information</p>
      <ul className={css.userInfo}>
        <li className={css.infoItem}>
          <div className={css.profileInfo}>
            <p className={css.userData}>{user.name}</p>
          </div>
        </li>
        <li className={css.infoItem}>
          <div className={css.profileInfo}>
            <p className={css.userData}>{user.email}</p>
          </div>
        </li>
        <li className={css.infoItem}>
          <div className={css.profileInfo}>
            <p className={css.userData}>{user.phone || "Add your phone"}</p>
          </div>
        </li>
      </ul>
    </>
  );
};
