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
        setShowCreateModal(false);
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries());
    
        const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/sensor?name=${formObject.name}&hardwareId=${formObject.hardwareId}&sensorAction=${formObject.sensorAction}&logId=${formObject.logId}&uid=${formObject.uid}`
    
        const data = { 
            userId: props.userId,
            sensorId: `${formObject.sensorId}`,
            name: `${formObject.name}`,
            hardwareId: `${formObject.hardwareId}`,
            sensorAction: `${formObject.sensorAction}`,
            logId: `${formObject.logId}`,

        };
    
        const config = {
          headers:{
                authorization: `Bearer ${user.accessToken}`,
          }
        }
    
        axios.put(url, data, config)
            .then(() => {
                let newrow = '';
                newrow += '<tr id='+`${data.sensorId}`+' key='+`${data.sensorId}`+'>';
                newrow += '<td>';
                newrow += '<input type="checkbox" id='+`${data.sensorId}`+' className="appearance-none checked:bg-green-700"/>';
                newrow += '</td>';
                newrow += '<td>' + `${data.sensorId}` + '</td>';
                newrow += '<td>'+`${data.name}`+'</td>';
                newrow += '<td>'+`${data.hardwareId}`+'</td>';
                newrow += '<td>'+`${data.sensorAction}`+'</td>';
                newrow += '<td>'+`${data.logId}`+'</td>';
                newrow += '</tr>';
                document.getElementById("sensorTable").innerHTML += newrow
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
                document.getElementById("logId").value = sensorObject.logId;
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
            sensorId: `${sensorId}`,
            name: `${formObject.name}`,
            hardwareId: `${formObject.hardwareId}`,
            sensorAction: `${formObject.sensorAction}`,
            logId: `${formObject.logId}`,
        };

        const config = {
            headers:{
                  authorization: `Bearer ${user.accessToken}`,
            }
        }

        axios.post(url, data, config)
            .then(() => {
                let newrow = '';
                newrow += '<tr id='+`${data.sensorId}`+' key='+`${data.sensorId}`+'>';
                newrow += '<td>';
                newrow += '<input type="checkbox" id='+`${data.sensorId}`+' className="appearance-none checked:bg-green-700"/>';
                newrow += '</td>';
                newrow += '<td>' + `${data.sensorId}` + '</td>';
                newrow += '<td>'+`${data.name}`+'</td>';
                newrow += '<td>'+`${data.hardwareId}`+'</td>';
                newrow += '<td>'+`${data.sensorAction}`+'</td>';
                newrow += '<td>'+`${data.logId}`+'</td>';
                newrow += '</tr>';
                document.getElementById(`${data.sensorId}`).innerHTML = newrow
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
                document.getElementById(`${config.data.sensorId}`).innerHTML ='' 
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
                                        <th className="text-left">Sensor ID</th>
                                        <th className="text-left">Name</th>
                                        <th className="text-left">Hardware ID</th>
                                        <th className="text-left">sensorAction</th>
                                        <th className="text-left">Log ID</th>
                                        <th className="text-left">Status</th>
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
                                        <td>
                                        <input type="checkbox" id={sensor.sensorId} className="appearance-none checked:bg-green-700" onChange={() => handleSensorSelection(sensor.sensorId)}/>
                                        </td>
                                        <td>{sensor.sensorId}</td>
                                        <td>{sensor.name}</td>
                                        <td>{sensor.hardwareId}</td>
                                        <td>{sensor.sensorAction}</td>
                                        <td>{sensor.logId}</td>
                                        <td>{sensor ? "🟢" : "🔴"}</td>
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
                    <p>No sensors registered</p>
                </div>
            )}

            {showCreateModal ? (
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour w-3/12 h-fit p-4 drop-shadow-2xl"> 
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
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Log Id</label>
                            <input id="logId" name="logId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
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
                    <form id="editForm" className="" action="#" method="POST" onSubmit={formEditSubmit}>
                        <div className="text-white mx-2">
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor ID</label>
                            <input id="sensorId" name="sensorId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Name</label>
                            <input id="name" name="name"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Hardware Id</label>
                            <input id="hardwareId" name="hardwareId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor Action</label>
                            <input id="sensorAction" name="sensorAction"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Log Id</label>
                            <input id="logId" name="logId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <div className="pt-4">
                                <button className="red_btn mx-2 mb-2" type="submit">Submit</button>
                            </div>
                            <div>
                                <button className="black_btn mx-2 mb-2" onClick={() => setShowEditModal(false)}>Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : null}

            {showDeleteModal ? (
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
            ) : null}
        </>
        
    )
}

export default SensorConfigCom
