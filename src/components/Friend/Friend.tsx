import css from "./Friend.module.css";
import type { Friend as FriendType } from "../../types/friend";

type FriendProps = {
  friend: FriendType;
};

export const Friend = ({ friend }: FriendProps) => {
  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1;
  const todayWorkDay = friend.workDays?.[dayIndex];
  const isOpen = todayWorkDay?.isOpen === true;

  return (
    <li className={css.friendItem}>
      <div className={css.imageWrapper}>
        <img src={friend.imageUrl} alt={friend.title} loading="lazy" />
      </div>

      <div className={css.friendInfo}>
        <div className={css.openTimeWrapper}>
          <p className={css.openTime}>
            {isOpen ? `${todayWorkDay.from} - ${todayWorkDay.to}` : "Closed"}
          </p>
        </div>
        <h3 className={css.friendName}>{friend.title}</h3>

        <div className={css.friendData}>
          <p className={css.data}>
            Email: <span className={css.info}>{friend.email}</span>
          </p>
          <p className={css.data}>
            Address: <span className={css.info}>{friend.address}</span>
          </p>
          <p className={css.data}>
            Phone: <span className={css.info}>{friend.phone}</span>
          </p>
        </div>
      </div>
    </li>
  );
};
