"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const LogConfigCom = (props) => {
    
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [logData, setLogData] = useState({});
    const [selectedLogs, setSelectedLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const { userId } = props;
    const [sensorsIds, setSensorIds] = useState([]);
    const [sensorArray, setSensorArray] = useState([]);

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

    // Get Request to get Sensors
      useEffect(() => {  
        if (user && user.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/sensor/byuid`;
          const params = {
            params: {
                // Gotta fix this
                uid: user.uid,
            },
          };
          const config = {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          }
    axios
      .get(getUrl, { ...params, ...config })
        .then((response) => {
          // Handle successful response and update state if necessary
          setSensorIds(response.data);
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
      }
    }, [user]); 

    useEffect(() => {
        const updatedSensorArray = sensorsIds.map((x) => ({ name: x.name, sensorId: x.sensorId }));
        setSensorArray(updatedSensorArray);
    }, [sensorsIds]);

    // Get Request to get Log Object 
    useEffect(() => {
        if (user && user.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/log/byuid`;
          const params = {
            params: {
              userId: props.uid,
              uid: user.uid,
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
    }, [user, props.uid]);

    const formCreateSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries());
    
        const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/log?userId=${props.userId}&name=${formObject.logName}&sensorId=${formObject.sensorId}&farmId=${formObject.farmId}&logSetting=${formObject.logSetting}&uid=${user.uid}`
    
        const data = { 
            userId: props.userId,
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
    
        axios.put(url, data, config)
        .then(() => {
            setShowCreateModal(false);
            window.location.reload();
          })
        .catch((error) => {
            const errorDiv = document.getElementById("errorMessage");
            errorDiv.innerHTML = "Error: " + error.response.data;
        });  
    }

    const prefillEditModal = (selectedLog) => {
        const logArray = Object.values(logData);
        const logObject = logArray.find((log) => selectedLog.includes(log.logId));

        if (logObject) {
            setTimeout(() => {
                document.getElementById("logId").value = logObject.logId;
                document.getElementById("logName").value = logObject.name;
                document.getElementById("sensorId").value = logObject.sensorId;
                document.getElementById("farmId").value = logObject.farmId;
                document.getElementById("logSetting").value = logObject.logSetting;
            }, 0);
        }
    };

    // POST Request to edit Log
    const formEditSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries())
        const logId = selectedLogs[0];


        const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/log`

        const data = { 
            userId: props.userId,
            logId: `${logId}`,
            name: `${formObject.logName}`,
            sensorId: `${formObject.sensorId}`,
            farmId: `${formObject.farmId}`,
            logSetting: `${formObject.logSetting}`,
        };

        const config = {
            headers:{
                  authorization: `Bearer ${user.accessToken}`,
            }
        }

        axios.post(url, data, config)
        .then(() => {
            setShowEditModal(false);
            window.location.reload();
          }) 
        .catch((error) => {
            const errorDiv = document.getElementById("errorMessage");
            errorDiv.innerHTML = "Error: " + error.response.data;
        });  
    }

    // DELETE request to delete Log
    const deleteLog = (event) => {
        if (user?.accessToken) {
          event.preventDefault();
          setShowDeleteModal(false);
          const logId = selectedLogs[0];
  
          const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/log?logId=${logId}`
          
          const config = {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
            data: {
              userId: props.userId,
              logId: `${logId}`,
            },
          };
  
          axios.delete(url, config)
          .then(() => {
            window.location.reload();
          });
        }
    }

    return (
        <>
            {logData && logData.length > 0 ? (
            <div>
                {/* Main Panel */}
                <div className="mt-4 ml-6 p-4 h-fit border-4 secondary-colour-border overflow-hidden">
                <h2 className="text-center text-lg font-medium secondary-colour-border">Logs</h2>
                    <div>
                        <div className="inline-flex rounded-md shadow-sm mb-2" role="group">
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={() => setShowCreateModal(true)}>
                                Create
                            </button>
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={async () => {
                                setShowEditModal(true);
                                await prefillEditModal(selectedLogs);
                            }}>
                                Edit
                            </button>
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={() => setShowDeleteModal(true)}>
                                Delete
                            </button>
                        </div>
                        <div className="ml-5">
                            <table className="table-fixed border-separate border-spacing-2 border-4 border-black w-full">
                                <thead>
                                    <tr>
                                        <th className="overflow-x-hidden text-left"></th>
                                        <th className="overflow-x-hidden text-left">Log ID</th>
                                        <th className="overflow-x-hidden text-left">Name</th>
                                        <th className="overflow-x-hidden text-left">Sensor ID</th>
                                        <th className="overflow-x-hidden text-left">Farm ID</th>
                                        <th className="overflow-x-hidden text-left">Log Setting</th>
                                        <th className="overflow-x-hidden text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody id="logTable">
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
                                    <tr id={log.logId} key={log.logId}>
                                        <td className="overflow-x-hidden">
                                        <input type="checkbox" id={log.logId} className="appearance-none checked:bg-green-700" onChange={() => handleLogSelection(log.logId)}/>
                                        </td>
                                        <td className="overflow-x-hidden">{log.logId}</td>
                                        <td className="overflow-x-hidden">{log.name}</td>
                                        <td className="overflow-x-hidden">{log.sensorId}</td>
                                        <td className="overflow-x-hidden">{log.farmId}</td>
                                        <td className="overflow-x-hidden">{log.logSetting}</td>
                                        {/* <td>{log ? "🟢" : "🔴"}</td> */}
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
                <div>
                {/* Main Panel */}
                <div className="mt-4 ml-6 p-4 h-fit border-4 secondary-colour-border">
                <h2 className="text-center text-lg font-medium secondary-colour-border">Logs</h2>
                    <div>
                        <div className="inline-flex rounded-md shadow-sm mb-2" role="group">
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={() => setShowCreateModal(true)}>
                                Create
                            </button>
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={async () => {
                                setShowEditModal(true);
                                await prefillEditModal(selectedLogs);
                            }}>
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
                                        <th className="overflow-x-hidden text-left"></th>
                                        <th className="overflow-x-hidden text-left">Log ID</th>
                                        <th className="overflow-x-hidden text-left">Name</th>
                                        <th className="overflow-x-hidden text-left">Sensor ID</th>
                                        <th className="overflow-x-hidden text-left">Farm ID</th>
                                        <th className="overflow-x-hidden text-left">Log Setting</th>
                                        <th className="overflow-x-hidden text-left">Status</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {showCreateModal ? (
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour sm:w-8/12 md:w-6/12 lg:w-4/12 h-fit p-4 drop-shadow-2xl"> 
                    <form className="" action="#" method="PUT" onSubmit={formCreateSubmit}>
                        <div className="text-white mx-2">
                            {/* <label className="block text-sm font-bold mx-2 text-white pt-4">Log ID</label>
                            <input id="logId" name="logId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" /> */}
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Log Name</label>
                            <input id="logName" name="logName"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            {/* <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor ID</label>
                            <input id="sensorId" name="sensorId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" /> */}
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Farm ID</label>
                            <input id="farmId" name="farmId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Log Setting</label>
                            <input id="logSetting" name="logSetting"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor</label>
                            <select id="sensorId" name="sensorId" className="mx-2 justify-center appearance-none border rounded px-8 text-black text-left">
                            <option defaultValue></option>
                            {sensorArray && sensorArray.length > 0
                                ? sensorArray.map((sensor) => (
                                    <option key={sensor.sensorId} value={sensor.sensorId}>
                                    {sensor.name}
                                    </option>
                                ))
                            : null}
                            </select>
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
                (selectedLogs.length > 0) ?
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour sm:w-8/12 md:w-6/12 lg:w-4/12 h-fit p-4 drop-shadow-2xl"> 
                    <form id="editForm" className="" action="#" method="POST" onSubmit={formEditSubmit}>
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
                            <div id="errorMessage" className='block text-sm font-medium leading-6 text-white'></div>
                            <div className="pt-4">
                                <button className="red_btn mx-2 mb-2" type="submit">Submit</button>
                            </div>
                            <div>
                                <button className="black_btn mx-2 mb-2" onClick={() => setShowEditModal(false)}>Close</button>
                            </div>
                        </div>
                    </form>
                </div>
                : 
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour w-3/12 h-fit p-4 drop-shadow-2xl">
                    <h1 className="text-white pb-4">No logs selected.</h1>
                    <div>
                        <button className="black_btn mb-2" onClick={() => setShowEditModal(false)}>Close</button>
                    </div>                    
                </div>
            ) : null}

            {showDeleteModal ? (
                (selectedLogs.length > 0) ?
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
                : 
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour w-3/12 h-fit p-4 drop-shadow-2xl">
                    <h1 className="text-white pb-4">No logs selected.</h1>
                    <div>
                        <button className="black_btn mb-2" onClick={() => setShowDeleteModal(false)}>Close</button>
                    </div>                    
                </div>
            ) : null}
        </>
        
    )
}

export default LogConfigCom
