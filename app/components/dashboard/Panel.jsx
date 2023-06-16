"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const Panel = () => {
    const [showPanelModal, setShowPanelModal] = useState(false);
    const [logData, setLogData] = useState({});
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();

    const formSubmit = (event) => {
        event.preventDefault();
        setShowPanelModal(false);
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries())


        const url = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/log?userId=1&logId=${formObject.logId}&name=${formObject.logName}&sensorId=${formObject.sensorId}&farmId=${formObject.farmId}&logSetting=${formObject.logSetting}`

        const data = { 
            userId: 1,
            logId: `${formObject.logId}`,
            name: `${formObject.logName}`,
            sensorId: `${formObject.sensorId}`,
            farmId: `${formObject.farmId}`,
            logSetting: `${formObject.logSetting}`
        };

        const config = {
            headers:{
                  authorization: `Bearer ${user.accessToken}`,
            }
        }

        axios.post(url, data, config);  
    }

    // Get Request to get Log Object 
    useEffect(() => {
        if (user && user.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/log`;
          const params = {
            params: {
              farmId: 1,
              userId: 1,
            },
          };
          const config = {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          };
    
          axios
            .get(getUrl, { ...params, ...config })
            .then((response) => {
              // Handle successful response and update state if necessary
              setLogData(response.data);
            })
            .catch((error) => {
              console.error("Error retrieving data:", error);
            })
            .finally(() => {
              setLoading(false);
            });
        }
    }, [user]);


    const deleteLog = (event) => {
        if (user?.accessToken) {
          event.preventDefault();
          setShowPanelModal(false);
  
          const url = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/log?logId=1`
          
          const config = {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
            data: {
              userId: 1,
              logId: 1,
            },
          };
  
          axios.delete(url, config);
        }
    }

    // useEffect(() => {
    //   console.log(logData);
    // }, [logData]);

    // if (loading) {
    //   return <div>Loading...</div>; 
    // }

    const logItem = logData[0];

    return (
        <>
            <div>
                {/* Main Panel */}
                <div className="mt-4 ml-6 p-4 w-11/12 h-fit border-4 secondary-colour-border">
                    <div className="ml-3">
                        <h2 className="text-center text-lg font-medium secondary-colour-border"> {logItem ? logItem.name : "Loading..."}</h2>
                        <p className="text-center text-sm font-medium secondary-colour-border text-blue-700" onClick={() => setShowPanelModal(true)}>Edit</p>
                    
                    <h2 className="text-center text-lg font-medium secondary-colour-border">Data</h2>
                        <p className="text-center tracking-widest secondary-colour-border">Log ID: {logItem ? logItem.logId : "Loading..."}</p>
                        <p className="text-center tracking-widest secondary-colour-border">Farm ID: {logItem ? logItem.farmId : "Loading..."}</p>
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
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Log Setting</label>
                            <input id="logSetting" name="logSetting"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <div className="pt-4">
                                <button className="black_btn mx-2 mb-2" type="submit">Submit</button>
                            </div>
                            <div>
                                <button className="red_btn mx-2 mb-2" type="delete" onClick={deleteLog}>Delete</button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : null}
        </>
    )
}

export default Panel
