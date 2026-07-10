import css from './FavoritesModal.module.css';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import cat from '../../assets/cat.png'

export const FavoritesModal = () => {
    return (
        <>
        <div className={css.iconWrapper}>
            <img src={cat} alt="cat-icon" />
        </div>
        <p>The pet in the favorites! May your friendship be the happiest and filled with fun.</p>
<Link to="/profile">
<Button>Go to profile</Button></Link>
        </>
    )
}