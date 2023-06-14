"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthContext();

  const formSubmit = (event) => {
    event.preventDefault();
    setShowModal(false);
    let formData = new FormData(event.target);
    let formObject = Object.fromEntries(formData.entries());;

    const url = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/farm?userId=1&farmId=1&name=${formObject.farmName}`

    const data = {
        userId: 1,
        farmId: 1,
        name: `${formObject.farmName}`,
    }

    const config = {
        headers:{
            authorization: `Bearer ${user.accessToken}`,
    }
    };

    axios.put(url, data, config);  
  }
  
  return (
    <>
    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setShowModal(true)}>
        <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
        <span className="ml-3">Add Farm</span>
    </a>

      {showModal ? (
        <div>
            <form className="" action="#" method="PUT" onSubmit={formSubmit}>
                <div className="border-2 border-gray-200 border-dashed rounded-lg text-white mx-2">
                    <label className="block text-sm font-bold mx-2 text-white pt-4">Farm Name <span className="text-red-500" onClick={() => setShowModal(false)}>X</span></label>
                    <input id="farmName" name="farmName" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                    <div className="pt-4">
                        <button className="black_btn mx-2 mb-2" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
