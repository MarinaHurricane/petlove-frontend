import { Friend } from "../Friend/Friend";
import type { Friend as FriendType } from "../../types/friend";
import css from "./FriendsList.module.css";

type FriendsListProps = {
  friends: FriendType[];
};

export const FriendsList = ({ friends }: FriendsListProps) => {
  return (
    <ul className={css.friendsList}>
      {friends.map((friend) => (
        <Friend key={friend._id} friend={friend} />
      ))}
    </ul>
  );
};
