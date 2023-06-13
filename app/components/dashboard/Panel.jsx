"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const Panel = () => {
    const [showPanelModal, setShowPanelModal] = useState(false);
    const { user } = useAuthContext();

    const formSubmit = (event) => {
        event.preventDefault();
        setShowPanelModal(false);
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries())

        const url = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/log?userId=1&logId=${formObject.logId}&name=${formObject.logName}&sensorId=${formObject.sensorId}&farmId=${formObject.farmId}`

        const data = { 
            userId: 1,
            logId: `${formObject.logId}`,
            name: `${formObject.logName}`,
            sensorId: `${formObject.sensorId}`,
            farmId: `${formObject.farmId}`
        };

        const config = {
            headers:{
                  authorization: `Bearer ${user.accessToken}`,
            }
        }

        axios.post(url, data, config);  
    }

    return (
        <>
            <div>
                {/* Main Panel */}
                <div className="mt-4 ml-6 p-4 w-11/12 h-fit border-4 secondary-colour-border">
                    <div className="ml-3">
                        <h2 className="text-center text-lg font-medium secondary-colour-border">Log</h2>
                        <p className="text-center text-sm font-medium secondary-colour-border text-blue-700" onClick={() => setShowPanelModal(true)}>Edit</p>
                        <p className="text-center tracking-widest secondary-colour-border">Carrots x 20</p>
                    
                    <h2 className="text-center text-lg font-medium secondary-colour-border">Data</h2>
                        <p className="text-center tracking-widest secondary-colour-border">Moisture Level: 95%</p>
                        <p className="text-center tracking-widest secondary-colour-border">Soil pH: 6.5pH</p>
                        <p className="text-center tracking-widest secondary-colour-border">Phosphorus Level: 22ppm</p>
                        <p className="text-center tracking-widest secondary-colour-border">Overall Plant Health: Great</p>
                    </div>
                </div>
            </div>

            {showPanelModal ? (
                <div className="absolute z-50 m-auto left-0 right-0 secondary-colour w-3/12 h-fit p-4"> 
                    <form className="" action="#" method="POST" onSubmit={formSubmit}>
                        <div className="border-2 border-gray-200 border-dashed rounded-lg text-white mx-2">
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Log ID <span className="text-red-500" onClick={() => setShowPanelModal(false)}>X</span></label>
                            <input id="logId" name="logId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Log Name</label>
                            <input id="logName" name="logName"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor ID</label>
                            <input id="sensorId" name="sensorId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Farm ID</label>
                            <input id="farmId" name="farmId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <div className="pt-4">
                                <button className="black_btn mx-2 mb-2" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : null}
        </>
    )
}

export default Panel
