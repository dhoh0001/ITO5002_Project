"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const Sensor = () => {
    const [showSensorModal, setShowSensorModal] = useState(false);
    const { user } = useAuthContext();

    const formSubmit = (event) => {
        event.preventDefault();
        setShowSensorModal(false);
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries());
        console.log(formObject);

        const url = `http://ec2-3-24-134-183.ap-southeast-2.compute.amazonaws.com/sensor?userId=1&sensorId=1&name=${formObject.sensorName}&hardwareId=${formObject.sensorId}&sensorAction=${formObject.sensorAction}`

        const data = {
        sensorId: 1,
        userId: 1,
        hardwareId: `${formObject.sensorId}`,
        name: `${formObject.sensorName}`,
        sensorAction: `${formObject.sensorAction}`
        }

        const config = {
        headers:{
            authorization: `Bearer ${user.accessToken}`,
        }
        };

        axios.post(url, data, config)
        }

    return (
        <>
            <div>
                {/* Main Panel */}
                <div className="mt-4 ml-6 p-4 w-11/12 h-fit border-4 secondary-colour-border">
                    <div className="ml-3">
                        <h2 className="text-center text-lg font-medium secondary-colour-border">Sensor(s)</h2>
                        <p className="text-center text-sm font-medium secondary-colour-border text-blue-700" onClick={() => setShowSensorModal(true)}>Edit</p>
                    
                        <p className="text-center tracking-widest secondary-colour-border">Water Control: Online</p>
                        <p className="text-center tracking-widest secondary-colour-border">Probes: Online</p>
                        <p className="text-center tracking-widest secondary-colour-border">Single Depth: Online</p>
                    </div>
                </div>
            </div>

            {showSensorModal ? (
                <div className="absolute z-50 m-auto left-0 right-0 secondary-colour w-3/12 h-fit p-4"> 
                    <div>
                    <form className="" action="#" method="POST" onSubmit={formSubmit}>
                        <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Name <span className="text-red-500" onClick={() => setShowSensorModal(false)}>X</span></label>
                        <input id="sensorName" name="sensorName" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                        <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Hardware ID</label>
                        <input id="sensorId" name="sensorId" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                        <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Action</label>
                        <input id="sensorAction" name="sensorAction" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                        <div className="pt-4">
                           <button className="black_btn mx-2 mb-2" type="submit">Submit</button>
                        </div>
                        <div>
                           <button className="red_btn mx-2 mb-2" type="delete">Delete</button>
                        </div>
                    </form>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Sensor