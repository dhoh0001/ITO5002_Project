"use client"
import React, { useState } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const Modal = () => {
  const [showSensorModal, setShowSensorModal] = useState(false);
  const { user } = useAuthContext();

  const formSubmit = (event) => {
    event.preventDefault();
    setShowSensorModal(false);
    let data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    console.log(formObject);
    axios.put(`ubuntu@ec2-3-24-134-183.ap-southeast-2.compute.amazonaws.com/sensor?Name=${formObject.sensorName}&hardwareId=${formObject.sensorId}&sensorAction=${formObject.sensorAction}`)
      .catch((error) => {
          if (error.response) {
              console.log("Server returned with status code");
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
          } else if (error.request) {
              console.log("Request made, no response received")
              console.log(error.request);
          } else {
              console.log("It's cooked.")
              console.log('Error', error.message);
          }
      });
    }

  return (
    <>
        <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setShowSensorModal(true)}>
        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        <span className="flex-1 ml-3 whitespace-nowrap">Add Sensor</span>
    </a>

      {showSensorModal ? (
        <div>
            <form className="" action="#" method="PUT" onSubmit={formSubmit}>
                <div className="border-2 border-gray-200 border-dashed rounded-lg text-white mx-2">
                    <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Name <span className="text-red-500" onClick={() => setShowSensorModal(false)}>X</span></label>
                    <input id="sensorName" name="sensorName" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                    <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Hardware ID</label>
                    <input id="sensorId" name="sensorId" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                    <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Action</label>
                    <input id="sensorAction" name="sensorAction" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
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