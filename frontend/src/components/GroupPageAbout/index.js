import React from "react";
import { useSelector } from "react-redux";


export default function About() {
  const user = useSelector((state) => state.session.user);

  return (
    <>
    <p>About Section!!</p>
    <p>{user && user.id}</p>
    </>
  )
}
