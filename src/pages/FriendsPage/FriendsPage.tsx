import css from './FriendsPage.module.css';
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../sevices/friendsPage";
import { Title } from '../../components/Title/Title';
import { FriendsList } from '../../components/FriendsList/FriendsList';

export const FriendsPage = () => {
    const {data: friendsData} = useQuery({
        queryKey: ["friends"],
        queryFn: getFriends,
    });

    const friends = friendsData;


    return (
        <section className={css.friendsPage}>
        <Title>Our friends</Title> 
      <FriendsList friends={friends}/>
      </section>
    )
}



