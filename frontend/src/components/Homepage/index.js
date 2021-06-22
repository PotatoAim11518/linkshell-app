// frontend/src/components/Homepage/index.js
import React from "react";
import { useSelector } from "react-redux";

const Homepage = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user)
  if (!sessionUser) {
    return <h1>Not Logged In User Splash</h1>;
  } else {
    return (
      <>
        <h2>Your Next Event</h2>
        <h2>Scheduled events from your groups</h2>
        <h2>Attend an event starting soon</h2>
      </>
    );
  }
};

export default Homepage;
