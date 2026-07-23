import { Friend } from '../Friend/Friend';
import css from './FriendsList.module.css';

export const FriendsList = ({friends}) => {
    return (
        <ul className={css.friendsList}>
             {friends?.map( friend => <Friend key={friend._id} friend={friend}/>)}
        </ul>
       
    )
}