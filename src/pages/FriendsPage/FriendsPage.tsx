import css from "./FriendsPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../sevices/friendsPage";
import { Title } from "../../components/Title/Title";
import { FriendsList } from "../../components/FriendsList/FriendsList";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const FriendsPage = () => {
  const {
    data: friendsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load friends");
    }
  }, [isError]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className={css.friendsPage}>
      <Title>Our friends</Title>
      <FriendsList friends={friendsData ?? []} />
    </section>
  );
};
