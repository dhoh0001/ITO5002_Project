"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const AlertConfigCom = (props) => {
    
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [alertData, setAlertData] = useState({});
    const [selectedAlerts, setSelectedAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const { userId } = props;

    const handleAlertSelection = (alertId) => {
        setSelectedAlerts((prevSelectedAlerts) => {
          if (prevSelectedAlerts.includes(alertId)) {
            // If the alert ID is already in the array, remove it
            return prevSelectedAlerts.filter((id) => id !== alertId);
          } else {
            // If the alert ID is not in the array, add it
            return [...prevSelectedAlerts, alertId];
          }
        });
    };

    // Get Request to get Alert Object 
    useEffect(() => {
        if (user && user.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/alert`;
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
              setAlertData(response.data);
            })
            .catch((error) => {
              console.error("Error retrieving data:", error);
            })
            .finally(() => {
              setLoading(false);
            });
        }
    }, [user, props.userId]);

    // PUT Request to create Alert
    const formCreateSubmit = (event) => {
        event.preventDefault();
        setShowAlertModal(false);
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries());
    
        const url = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/alert?userId=${props.userId}&alertId=${formObject.alertId}&name=${formObject.alertName}&sensorId=${formObject.sensorId}&farmId=${formObject.farmId}&alertSetting=${formObject.alertSetting}`
    
        const data = { 
            userId: props.userId,
            alertId: `${formObject.alertId}`,
        };
    
        const config = {
          headers:{
                authorization: `Bearer ${user.accessToken}`,
          }
        }
    
        axios.put(url, data, config);  
    }

    // POST Request to edit Alert
    const formEditSubmit = (event) => {
        event.preventDefault();
        setShowPanelModal(false);
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries())
        const alertId = selectedAlerts[0];


        const url = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/alert?userId=${props.userId}&&alertId=${alertId}&name=${formObject.alertName}&sensorId=${formObject.sensorId}&farmId=${formObject.farmId}&alertSetting=${formObject.alertSetting}`

        const data = { 
            userId: props.userId,
            alertId: `${alertId}`,
            name: `${formObject.alertName}`,
            sensorId: `${formObject.sensorId}`,
            farmId: `${formObject.farmId}`,
            alertSetting: `${formObject.alertSetting}`
        };

        const config = {
            headers:{
                  authorization: `Bearer ${user.accessToken}`,
            }
        }

        axios.post(url, data, config);  
    }

    // DELETE request to delete Alert
    const deleteAlert = (event) => {
        if (user?.accessToken) {
          event.preventDefault();
          setShowPanelModal(false);
          const alertId = selectedAlerts[0];
  
          const url = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/alert?alertId=${alertId}`
          
          const config = {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
            data: {
              userId: props.userId,
              alertId: `${alertId}`,
            },
          };
  
          axios.delete(url, config);
        }
    }

    return (
        <>
            {alertData && alertData.length > 0 ? (
            <div>
                {/* Main Panel */}
                <div className="mt-4 ml-6 p-4 h-fit border-4 secondary-colour-border">
                <h2 className="text-center text-lg font-medium secondary-colour-border">Alerts</h2>
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
                                        <th className="text-left">Alert ID</th>
                                        <th className="text-left">Name</th>
                                        <th className="text-left">Alert Level</th>
                                        <th className="text-left">Timeframe</th>
                                        <th className="text-left">Farm ID</th>
                                        <th className="text-left">Log ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {loading ? (
                                    <tr>
                                    <td colSpan="5">Loading...</td>
                                    </tr>
                                ) : alertData.length === 0 ? (
                                    <tr>
                                    <td colSpan="5">No alerts found.</td>
                                    </tr>
                                ) : (
                                    alertData.map((alert) => (
                                    <tr key={alert.alertId}>
                                        <td>
                                        <input type="checkbox" id={alert.alertId} className="appearance-none checked:bg-green-700" onChange={() => handleAlertSelection(alert.alertId)}/>
                                        </td>
                                        <td>{alert.alertId}</td>
                                        <td>{alert.name}</td>
                                        <td>{alert.alertLevel}</td>
                                        <td>{alert.timeframe}</td>
                                        <td>{alert.farmId}</td>
                                        <td>{alert.logId}</td>
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
                    <p>No alerts registered</p>
                </div>
            )}

            {showCreateModal ? (
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour w-3/12 h-fit p-4 drop-shadow-2xl"> 
                    <form className="" action="#" method="PUT" onSubmit={formCreateSubmit}>
                        <div className="text-white mx-2">
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Alert ID</label>
                            <input id="alertId" name="alertId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Alert Name</label>
                            <input id="alertName" name="alertName"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor ID</label>
                            <input id="sensorId" name="sensorId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Farm ID</label>
                            <input id="farmId" name="farmId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Alert Setting</label>
                            <input id="alertSetting" name="alertSetting"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
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
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Alert ID</label>
                            <input id="alertId" name="alertId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Alert Name</label>
                            <input id="alertName" name="alertName"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor ID</label>
                            <input id="sensorId" name="sensorId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Farm ID</label>
                            <input id="farmId" name="farmId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Alert Setting</label>
                            <input id="alertSetting" name="alertSetting"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
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
                        <label className="block text-sm font-bold mx-2 text-white pt-4 pb-4">Are you sure you want to delete this alert?</label>
                        <div className="pt-4">
                           <button className="red_btn mx-2 mb-2" type="submit" onClick={deleteAlert}>Delete</button>
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

export default AlertConfigCom