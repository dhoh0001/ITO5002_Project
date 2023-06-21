"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const SensorConfigCom = (props) => {
    
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sensorData, setSensorData] = useState({});
    const [selectedSensors, setSelectedSensors] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const { userId } = props;

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

    // Get Request to get Sensor Object 
    useEffect(() => {
        if (user && user.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/sensor/byuid`;
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
              setSensorData(response.data);
            })
            .catch((error) => {
              console.error("Error retrieving data:", error);
            })
            .finally(() => {
              setLoading(false);
            });
        }
    }, [user, props.uid]);

    // PUT Request to create Sensor
    const formCreateSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries());
    
        const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/sensor?name=${formObject.name}&hardwareId=${formObject.hardwareId}&farmId=${formObject.farmId}&sensorAction=${formObject.sensorAction}`
    
        const data = { 
            farmId: formObject.farmId,
            name: `${formObject.name}`,
            hardwareId: `${formObject.hardwareId}`,
            sensorId: formObject.sensorId,
            sensorAction: `${formObject.sensorAction}`
        };
    
        const config = {
          headers:{
            authorization: `Bearer ${user.accessToken}`,
          }
        };
    
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

    const prefillEditModal = (selectedSensor) => {
        const sensorArray = Object.values(sensorData);
        const sensorObject = sensorArray.find((sensor) => selectedSensor.includes(sensor.sensorId));

        if (sensorObject) {
            setTimeout(() => {
                document.getElementById("sensorId").value = sensorObject.sensorId;
                document.getElementById("name").value = sensorObject.name;
                document.getElementById("hardwareId").value = sensorObject.hardwareId;
                document.getElementById("sensorAction").value = sensorObject.sensorAction;
                document.getElementById("farmId").value = sensorObject.farmId;
            }, 0);
        }
    };

    // POST Request to edit Sensor
    const formEditSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries())
        const sensorId = selectedSensors[0];


        const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/sensor`

        const data = { 
            userId: props.userId,
            sensorId: `${sensorId}`,
            name: `${formObject.name}`,
            hardwareId: `${formObject.hardwareId}`,
            sensorAction: `${formObject.sensorAction}`,
            farmId: `${formObject.farmId}`,
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

    // DELETE request to delete Sensor
    const deleteSensor = (event) => {
        if (user?.accessToken) {
          event.preventDefault();
          setShowDeleteModal(false);
          const sensorId = selectedSensors[0];
  
          const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/sensor?sensorId=${sensorId}`
          
          const config = {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
            data: {
              userId: props.userId,
              sensorId: `${sensorId}`,
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
                <div className="mt-4 ml-6 p-4 h-fit border-4 secondary-colour-border overflow-hidden">
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
                                        <th className="overflow-x-hidden text-left"></th>
                                        <th className="overflow-x-hidden text-left">Sensor ID</th>
                                        <th className="overflow-x-hidden text-left">Name</th>
                                        <th className="overflow-x-hidden text-left">Hardware ID</th>
                                        <th className="overflow-x-hidden text-left">sensorAction</th>
                                    </tr>
                                </thead>
                                <tbody id="sensorTable">
                                {loading ? (
                                    <tr>
                                    <td colSpan="5">Loading...</td>
                                    </tr>
                                ) : sensorData.length === 0 ? (
                                    <tr>
                                    <td colSpan="5">No sensors found.</td>
                                    </tr>
                                ) : (
                                    sensorData.map((sensor) => (
                                    <tr id={sensor.sensorId} key={sensor.sensorId}>
                                        <td className="overflow-x-hidden">
                                        <input type="checkbox" id={sensor.sensorId} className="appearance-none checked:bg-green-700" onChange={() => handleSensorSelection(sensor.sensorId)}/>
                                        </td>
                                        <td className="overflow-x-hidden">{sensor.sensorId}</td>
                                        <td className="overflow-x-hidden">{sensor.name}</td>
                                        <td className="overflow-x-hidden">{sensor.hardwareId}</td>
                                        <td className="overflow-x-hidden">{sensor.sensorAction}</td>
                                        {/* <td>{sensor ? "🟢" : "🔴"}</td> */}
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
                            <table className="overflow-x-hidden table-auto border-separate border-spacing-2 border-4 border-black w-full">
                                <thead>
                                    <tr>
                                        <th className="overflow-x-hidden text-left"></th>
                                        <th className="overflow-x-hidden text-left">Sensor ID</th>
                                        <th className="overflow-x-hidden text-left">Name</th>
                                        <th className="overflow-x-hidden text-left">Hardware ID</th>
                                        <th className="overflow-x-hidden text-left">sensorAction</th>
                                        <th className="overflow-x-hidden text-left">Farm ID</th>
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
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor ID</label>
                            <input id="sensorId" name="sensorId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Name</label>
                            <input id="name" name="name"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Hardware Id</label>
                            <input id="hardwareId" name="hardwareId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Action</label>
                            <input id="sensorAction" name="sensorAction"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Farm Id</label>
                            <input id="farmId" name="farmId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <div id="errorMessage" className='block text-sm font-medium leading-6 text-white'></div>
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
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour sm:w-8/12 md:w-6/12 lg:w-4/12 h-fit p-4 drop-shadow-2xl"> 
                    <form id="editForm" className="" action="#" method="POST" onSubmit={formEditSubmit}>
                        <div className="text-white mx-2">
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor ID</label>
                            <input id="sensorId" name="sensorId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black pointer-events-none bg-slate-400" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Name</label>
                            <input id="name" name="name"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Hardware Id</label>
                            <input id="hardwareId" name="hardwareId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Action</label>
                            <input id="sensorAction" name="sensorAction"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Farm Id</label>
                            <input id="farmId" name="farmId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
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
                        <label className="block text-sm font-bold mx-2 text-white pt-4 pb-4">Are you sure you want to delete this sensor?</label>
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

export default SensorConfigCom
