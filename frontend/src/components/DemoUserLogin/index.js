import React from "react";
import { signup } from "../../store/session";


const DemoUserLogin = () => {

  const handleDemoLogin = () => {
    const randomNum = Math.floor(Math.random() * 999999);
    const generateRandomString = () => {
      return Math.random().toString.substring(8)
    }
    const randomUser = `DemoUser${randomNum}`;
    const randomEmail = `${randomUser}@linkshelldemo.com`;
    const randomPassword = generateRandomString();
    const newDemoUser = {
      randomUser,
      randomEmail,
      randomPassword
    }


    signup(newDemoUser)
  }

  return (
    <button onClick={handleDemoLogin}>Demo User Login</button>
  )
}


export default DemoUserLogin;
