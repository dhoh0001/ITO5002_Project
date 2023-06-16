"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const LightPanel = (props) => {
    
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [logData, setLogData] = useState({});
    const [selectedLogs, setSelectedLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const { userId } = props;

    const handleLogSelection = (logId) => {
        setSelectedLogs((prevSelectedLogs) => {
          if (prevSelectedLogs.includes(logId)) {
            // If the log ID is already in the array, remove it
            return prevSelectedLogs.filter((id) => id !== logId);
          } else {
            // If the log ID is not in the array, add it
            return [...prevSelectedLogs, logId];
          }
        });
    };

    // Get Request to get Log Object 
    useEffect(() => {
        if (user && user.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/log`;
          const params = {
            params: {
              userId: props.userId,
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
    }, [user, props.userId]);

    // PUT Request to create Log
    const formCreateSubmit = (event) => {
        event.preventDefault();
        setShowLogModal(false);
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries());
    
        const url = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/log?userId=${props.userId}&logId=${formObject.logId}&name=${formObject.logName}&sensorId=${formObject.sensorId}&farmId=${formObject.farmId}&logSetting=${formObject.logSetting}`
    
        const data = { 
            userId: props.userId,
            logId: `${formObject.logId}`,
        };
    
        const config = {
          headers:{
                authorization: `Bearer ${user.accessToken}`,
          }
        }
    
        axios.put(url, data, config);  
    }

    // POST Request to edit Log
    const formEditSubmit = (event) => {
        event.preventDefault();
        setShowPanelModal(false);
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries())
        const logId = selectedLogs[0];


        const url = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/log?userId=${props.userId}&&logId=${logId}&name=${formObject.logName}&sensorId=${formObject.sensorId}&farmId=${formObject.farmId}&logSetting=${formObject.logSetting}`

        const data = { 
            userId: props.userId,
            logId: `${logId}`,
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

    // DELETE request to delete Log
    const deleteLog = (event) => {
        if (user?.accessToken) {
          event.preventDefault();
          setShowPanelModal(false);
          const logId = selectedLogs[0];
  
          const url = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/log?logId=${logId}`
          
          const config = {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
            data: {
              userId: props.userId,
              logId: `${logId}`,
            },
          };
  
          axios.delete(url, config);
        }
    }

    return (
        <>
            {logData && logData.length > 0 ? (
            <div>
                {/* Main Panel */}
                <div className="mt-4 ml-6 p-4 h-fit border-4 secondary-colour-border">
                <h2 className="text-center text-lg font-medium secondary-colour-border">Logs</h2>
                    <div>
                        <div className="inline-flex rounded-md shadow-sm mb-2" role="group">
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={() => setShowCreateModal(true)}>
                                Create
                            </button>
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={() => setShowEditModal(true)}>
                                Edit
                            </button>
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={() => setShowDeleteModal(true)}>
                                Delete
                            </button>
                        </div>
                        <div className="ml-5">
                            <table className="table-auto border-separate border-spacing-2 border-4 border-black w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left"></th>
                                        <th className="text-left">Log ID</th>
                                        <th className="text-left">Name</th>
                                        <th className="text-left">Farm ID</th>
                                        <th className="text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {loading ? (
                                    <tr>
                                    <td colSpan="5">Loading...</td>
                                    </tr>
                                ) : logData.length === 0 ? (
                                    <tr>
                                    <td colSpan="5">No logs found.</td>
                                    </tr>
                                ) : (
                                    logData.map((log) => (
                                    <tr key={log.logId}>
                                        <td>
                                        <input type="checkbox" id={log.logId} className="appearance-none checked:bg-green-700" onChange={() => handleLogSelection(log.logId)}/>
                                        </td>
                                        <td>{log.logId}</td>
                                        <td>{log.name}</td>
                                        <td>{log.farmId}</td>
                                        <td>{log ? "🟢" : "🔴"}</td>
                                    </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
                <div className="mt-4 ml-6 p-4 h-fit border-4 secondary-colour-border">
                    <p>No logs registered</p>
                </div>
            )}

            {showCreateModal ? (
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour w-3/12 h-fit p-4 drop-shadow-2xl"> 
                    <form className="" action="#" method="PUT" onSubmit={formCreateSubmit}>
                        <div className="text-white mx-2">
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Log ID</label>
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
                                <button className="red_btn mx-2 mb-2" type="submit">Submit</button>
                            </div>
                            <div>
                                <button className="black_btn mx-2 mb-2" type="delete" onClick={() => setShowCreateModal(false)}>Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : null}

            {showEditModal ? (
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour w-3/12 h-fit p-4 drop-shadow-2xl"> 
                    <form className="" action="#" method="POST" onSubmit={formEditSubmit}>
                        <div className="text-white mx-2">
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Log ID</label>
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
                                <button className="red_btn mx-2 mb-2" type="submit">Submit</button>
                            </div>
                            <div>
                                <button className="black_btn mx-2 mb-2" type="delete" onClick={() => setShowEditModal(false)}>Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : null}

            {showDeleteModal ? (
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour w-3/12 h-fit p-4 drop-shadow-2xl"> 
                    <div>
                        <label className="block text-sm font-bold mx-2 text-white pt-4 pb-4">Are you sure you want to delete this log?</label>
                        <div className="pt-4">
                           <button className="red_btn mx-2 mb-2" type="submit" onClick={deleteLog}>Delete</button>
                        </div>
                        <div>
                           <button className="black_btn mx-2 mb-2" type="delete" onClick={() => setShowDeleteModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
        
    )
}

export default LightPanel