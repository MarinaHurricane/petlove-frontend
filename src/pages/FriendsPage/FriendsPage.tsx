import css from './FriendsPage.module.css';
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../sevices/friendsPage";
import { Title } from '../../components/Title/Title';

export const FriendsPage = () => {
    const {data: friendsData} = useQuery({
        queryKey: ["friends"],
        queryFn: getFriends,
    });

    const friends = friendsData;
    console.log(friends);

    return (
        <>
        <Title>Our friends</Title> 
      <FriendsList friends={friends}/>
      </>
    )
}

export const FriendsList = ({friends}) => {
    return (
        <ul>
             {friends?.map( friend => <Friend key={friend._id} friend={friend}/>)}
        </ul>
       
    )
}

export const Friend = ({friend}) => {
    const today = new Date().getDay();
    console.log(today);
    const dayIndex = today === 0 ? 6 : today - 1;
    console.log(dayIndex);
    const isOpen = friend?.workDays?.[dayIndex]?.isOpen === true;
    // const isWorkingDay = friend?.workDays?.[dayIndex];
    return (
        <li className={css.friendItem}>
            <p>{isOpen ? `${friend?.workDays?.[dayIndex]?.from} - ${friend?.workDays?.[dayIndex]?.to}` : 'closed'}</p>
            <div className={css.friendInfo}>
                <img src={friend.imageUrl} alt={friend.title}/>
                <h3>{friend.title}</h3>
                <p>Email: <span>{friend.email}</span></p>
                <p>Adress: <span>{friend.eaddress}</span></p>
                <p>Phone: <span>{friend.phone}</span></p>
            </div>
        </li>
    )
}