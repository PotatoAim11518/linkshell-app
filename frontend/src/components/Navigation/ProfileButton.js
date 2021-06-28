import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import styles from './Navigation.module.css'


const ProfileButton = ({user}) => {
  const dispatch = useDispatch();
  const [ showMenu, setShowMenu ] = useState(false);
  const { username, email } = user;

  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push('/login')
  }

  const openMenu = () => {
    if (showMenu) return
    setShowMenu(true);
  }


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false)
    }

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu])

  return (
    <>
      <Link className={styles.profileButton} onClick={openMenu}>
        <img className={styles.profileImage} src='/assets/jobclasses/BLM.png' alt='profile icon'/></Link>
      {showMenu && (
        <ul className={styles.dropdownItems}>
          <li className={styles.li}>{username}</li>
          <li className={styles.li}>{email}</li>
          <li className={styles.li}>
            <button className={styles.button} onClick={logout}>Logout</button>
          </li>
        </ul>
      )}
    </>

  )
}

export default ProfileButton;
