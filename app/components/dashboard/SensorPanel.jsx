"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const SensorPanel = (props) => {
    
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sensorData, setSensorData] = useState([]);
    const [selectedSensors, setSelectedSensors] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const { userId, farmId } = props;

    const handleSensorSelection = (sensorId) => {
        setSelectedSensors((prevSelectedSensors) => {
          if (prevSelectedSensors.includes(sensorId)) {
            // If the sensor ID is already in the array, remove it
            return prevSelectedSensors.filter((id) => id !== sensorId);
          } else {
            // If the sensor ID is not in the array, add it
            return [...prevSelectedSensors, sensorId];
          }
        });
    };

    // Get Request to get Sensor Name 
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
          };

    axios
      .get(getUrl, { ...params, ...config })
        .then((response) => {
          // Handle successful response and update state if necessary
          setSensorData(response.data);
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
      }
    }, [user]); 

    // PUT Request to create Log
    const formCreateSubmit = (event) => {
        event.preventDefault();
        setShowCreateModal(false);
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries());
    
        const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/sensor?userId=${props.userId}&name=${formObject.sensorName}&hardwareId=${formObject.hardwareId}&farmId=${farmId}&sensorAction=${formObject.sensorAction}`
    
        const data = { 
            userId: props.userId,
            name: `${formObject.sensorName}`,
            hardwareId: `${formObject.hardwareId}`,
            sensorId: formObject.sensorId,
            farmId: `${farmId}`,
            sensorAction: `${formObject.sensorAction}`
        };
    
        const config = {
          headers:{
            authorization: `Bearer ${user.accessToken}`,
          }
        };
    
        axios.put(url, data, config)
        .then(() => {
            window.location.reload();
          });
      }


    const prefillEditModal = (selectedSensors) => {
        const sensorArray = Object.values(sensorData);
        const sensorObject = sensorArray.find((sensor) => selectedSensors.includes(sensor.sensorId));
      
        if (sensorObject) {
          setTimeout(() => {
            // document.getElementById("id").value = sensorObject.id;
            document.getElementById("sensorName").value = sensorObject.name;
            document.getElementById("sensorHardwareId").value = sensorObject.hardwareId;
            document.getElementById("sensorAction").value = sensorObject.sensorAction;
            document.getElementById("sensorId").value = sensorObject.sensorId;
          }, 0);
        }
      };

    // POST Request to edit Sensor
    const formEditSubmit = (event) => {
        event.preventDefault();
        setShowEditModal(false);
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries())
        const sensorId = selectedSensors[0];


        const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/sensor`

        const data = { 
            userId: props.userId,
            sensorId: sensorId,
            name: `${formObject.sensorName}`,
            hardwareId: `${formObject.sensorHardwareId}`,
            sensorAction: `${formObject.sensorAction}`,
        };

        const config = {
            headers:{
                  authorization: `Bearer ${user.accessToken}`,
            }
        }

        axios.post(url, data, config)
        .then(() => {
            window.location.reload();
          });
    }

    // DELETE request to delete Log
    const deleteSensor = (event) => {
        if (user?.accessToken) {
          event.preventDefault();
          setShowDeleteModal(false);
          const sensorId = selectedSensors[0];
  
          const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/sensor?userId=${props.userId}&sensorId=${sensorId}`
          
          const config = {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
            data: {
              userId: props.userId,
              sensorId: sensorId,
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
            {sensorData && sensorData.length > 0 ? (
            <div>
                {/* Main Panel */}
                <div className="mt-4 ml-6 p-4 h-fit border-4 secondary-colour-border">
                <h2 className="text-center text-lg font-medium secondary-colour-border">Sensors</h2>
                    <div>
                        <div className="inline-flex rounded-md shadow-sm mb-2" role="group">
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={() => setShowCreateModal(true)}>
                                Create
                            </button>
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={async () => {
                            setShowEditModal(true);
                            await prefillEditModal(selectedSensors);
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
                                        <th className="text-left"></th>
                                        <th className="text-left">ID</th>
                                        <th className="text-left">Name</th>
                                        <th className="text-left">Hardware ID</th>
                                        <th className="text-left">Sensor Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {loading ? (
                                    <tr>
                                    <td colSpan="5">Loading...</td>
                                    </tr>
                                ) : sensorData.length === 0 ? (
                                    <tr>
                                    <td colSpan="5">No logs found.</td>
                                    </tr>
                                ) : (
                                    sensorData.map((sensor) => (    
                                    <tr key={sensor.sensorId}>
                                        <td>
                                            <input type="checkbox" id={sensor.sensorId} className="appearance-none checked:bg-green-700" onChange={() => handleSensorSelection(sensor.sensorId)}/>
                                        </td>
                                        <td>{sensor.sensorId}</td>
                                        <td>{sensor.name}</td>
                                        <td>{sensor.hardwareId}</td>
                                        <td>{sensor.sensorAction}</td>
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
                <h2 className="text-center text-lg font-medium secondary-colour-border">Sensors</h2>
                    <div>
                        <div className="inline-flex rounded-md shadow-sm mb-2" role="group">
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={() => setShowCreateModal(true)}>
                                Create
                            </button>
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={async () => {
                            setShowEditModal(true);
                            await prefillEditModal(selectedSensors);
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
                                    <th className="text-left"></th>
                                        <th className="text-left">Sensor ID</th>
                                        <th className="text-left">Name</th>
                                        <th className="text-left">Hardware ID</th>
                                        <th className="text-left">Sensor Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="5">No sensors found.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {showCreateModal ? (
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour w-3/12 h-fit p-4 drop-shadow-2xl"> 
                    <form className="" action="#" method="PUT" onSubmit={formCreateSubmit}>
                        <div className="text-white mx-2">
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Name</label>
                            <input id="sensorName" name="sensorName" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Hardware ID</label>
                            <input id="hardwareId" name="hardwareId" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Action</label>
                            <input id="sensorAction" name="sensorAction" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Id</label>
                            <input id="sensorId" name="sensorId" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
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
                (selectedSensors.length > 0) ?
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour w-3/12 h-fit p-4 drop-shadow-2xl"> 
                    <form id="editForm" className="" action="#" method="POST" onSubmit={formEditSubmit}>
                    <div className="text-white mx-2">
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Name</label>
                            <input id="sensorName" name="sensorName" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Hardware ID</label>
                            <input id="sensorHardwareId" name="sensorHardwareId" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Action</label>
                            <input id="sensorAction" name="sensorAction" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Id</label>
                            <input id="sensorId" name="sensorId" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <div className="pt-4">
                                <button className="red_btn mx-2 mb-2" type="submit">Submit</button>
                            </div>
                            <div>
                                <button className="black_btn mx-2 mb-2" type="delete" onClick={() => setShowEditModal(false)}>Close</button>
                            </div>
                        </div>
                    </form>
                </div>
                : 
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour w-3/12 h-fit p-4 drop-shadow-2xl">
                    <h1 className="text-white pb-4">No sensors selected.</h1>
                    <div>
                        <button className="black_btn mb-2" onClick={() => setShowEditModal(false)}>Close</button>
                    </div>                    
                </div>
            ) : null}

            {showDeleteModal ? (
                (selectedSensors.length > 0) ?
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour w-3/12 h-fit p-4 drop-shadow-2xl"> 
                    <div>
                        <label className="block text-sm font-bold mx-2 text-white pt-4 pb-4">Are you sure you want to delete this Sensor?</label>
                        <div className="pt-4">
                           <button className="red_btn mx-2 mb-2" type="submit" onClick={deleteSensor}>Delete</button>
                        </div>
                        <div>
                           <button className="black_btn mx-2 mb-2" type="delete" onClick={() => setShowDeleteModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
                : 
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour w-3/12 h-fit p-4 drop-shadow-2xl">
                    <h1 className="text-white pb-4">No sensors selected.</h1>
                    <div>
                        <button className="black_btn mb-2" onClick={() => setShowDeleteModal(false)}>Close</button>
                    </div>                    
                </div>
            ) : null}
        </>
        
    )
}

export default SensorPanel
