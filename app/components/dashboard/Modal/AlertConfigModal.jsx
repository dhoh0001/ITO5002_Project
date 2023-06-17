"use client"
import React, { useState } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const Modal = () => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const { user } = useAuthContext();

  const formSubmit = (event) => {
    event.preventDefault();
    setShowAlertModal(false);
    let formData = new FormData(event.target);
    let formObject = Object.fromEntries(formData.entries());
    
    const url = `http://ec2-3-27-1-118.ap-southeast-2.compute.amazonaws.com/alert?userId=1&alertId=${formObject.alertId}&name=${formObject.alertName}&alertLevel=${formObject.alertLevel}&timeframe=${formObject.alertTimeframe}&farmId=${formObject.farmId}&logId=${formObject.logId}&uid=${user.uid}`

    console.log(url);

    const data = {
      userId: 1,
      alertId: `${formObject.alertId}`,
      Name: `${formObject.alertName}`,
      alertLevel: `${formObject.alertLevel}`,
      timeframe: `${formObject.alertTimeframe}`,
      farmId: `${formObject.farmId}`,
      logId: `${formObject.logId}`,
    }

    const config = {
      headers:{
          authorization: `Bearer ${user.accessToken}`,
      }
    }

    axios.put(url, data, config); 
  }


  return (
    <>
        <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" >
        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        <span className="flex-1 ml-3">Add Alert</span>
    </a>

    </>
  );
}

export default Modal;
