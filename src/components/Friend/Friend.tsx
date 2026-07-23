import css from "./Friend.module.css";

export const Friend = ({ friend }) => {
  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1;
  const isOpen = friend?.workDays?.[dayIndex]?.isOpen === true;
  return (
    <li className={css.friendItem}>
      <div className={css.imageWrapper}>
        <img src={friend.imageUrl} alt={friend.title} />
      </div>

      <div className={css.friendInfo}>
        <div className={css.openTimeWrapper}>
          <p className={css.openTime}>
            {isOpen
              ? `${friend?.workDays?.[dayIndex]?.from} - ${friend?.workDays?.[dayIndex]?.to}`
              : "closed"}
          </p>
        </div>
        <h3 className={css.friendName}>{friend.title}</h3>

        <div className={css.friendInfo}>
          <p className={css.data}>
            Email: <span className={css.info}>{friend.email}</span>
          </p>
          <p className={css.data}>
            Adress: <span className={css.info}>{friend.eaddress}</span>
          </p>
          <p className={css.data}>
            Phone: <span className={css.info}>{friend.phone}</span>
          </p>
        </div>
      </div>
    </li>
  );
};
