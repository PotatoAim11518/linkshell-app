import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateGroupButton from '../GroupCreation/CreateGroupButton';
import styles from './Navigation.module.css'

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className={styles.dropdown}>
        <ProfileButton user={sessionUser}/>
      </div>
    )
  } else {
    sessionLinks = (
        <div className={styles.sessionLinksContainer}>
          <div className={styles.sessionLinks}>
            <NavLink to='/login' className={styles.navlink} activeClassName={styles.navlink__active}>Login</NavLink>
          </div>
          <div className={styles.sessionLinks}>
            <NavLink to='/signup' className={styles.navlink} activeClassName={styles.navlink__active}>Sign Up</NavLink>
          </div>
        </div>
    )
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.homeBtn}>
        <NavLink exact to='/' className={styles.navlink} activeClassName={styles.navlink__active}>Home</NavLink>
      </div>
      <div className={styles.createGroupButton}>
        <CreateGroupButton />
      </div>
      <div className={styles.sessionLinks}>
        {isLoaded && sessionLinks}
      </div>
    </div>
  )
}


export default Navigation;
