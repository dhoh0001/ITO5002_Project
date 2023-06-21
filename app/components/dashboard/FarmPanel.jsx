"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const LightPanel = (props) => {
    
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [farmData, setFarmData] = useState({});
    const [selectedFarms, setSelectedFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const { userId, farmId } = props;

    const handleFarmSelection = (farmId) => {
        setSelectedFarms((prevSelectedFarms) => {
          if (prevSelectedFarms.includes(farmId)) {
            // If the farm ID is already in the array, remove it
            return prevSelectedFarms.filter((id) => id !== farmId);
          } else {
            // If the farm ID is not in the array, add it
            return [...prevSelectedFarms, farmId];
          }
        });
    };

    // Get Request to get Farm Object 
    useEffect(() => {
        if (user && user.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/farm/byuid`
          const params = {
            params: {
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
              setFarmData(response.data);
            })
            .catch((error) => {
              console.error("Error retrieving data:", error);
            })
            .finally(() => {
              setLoading(false);
            });
        }
    }, [user, props.uid]);

    // PUT Request to create Farm
    const formCreateSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries());
    
        const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/farm?name=${formObject.farmName}&userId=${formObject.userId}`
    
        const data = { 
            userId: props.userId,
            farmId: `${formObject.farmId}`,
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

    const prefillEditModal = (selectedFarm) => {
        const farmArray = Object.values(farmData);
        const farmObject = farmArray.find((farm) => selectedFarm.includes(farm.farmId));
      
        if (farmObject) {
          setTimeout(() => {
            document.getElementById("farmId").value = farmObject.farmId;
            document.getElementById("farmName").value = farmObject.name;
            document.getElementById("userId").value = farmObject.userId;
          }, 0);
        }
      };

    // POST Request to edit Farm
    const formEditSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries())
        const farmId = selectedFarms[0];


        const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/farm?farmId=${formObject.farmName}&name=${formObject.farmName}&userId=${formObject.userId}`

        const data = { 
            userId: props.userId,
            farmId: `${farmId}`,
            name: `${formObject.farmName}`,
            userId: `${formObject.userId}`,
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


    // DELETE request to delete Farm
    const deleteFarm = (event) => {
        if (user?.accessToken) {
          event.preventDefault();
          setShowDeleteModal(false);
          const farmId = selectedFarms[0];
  
          const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/farm?farmId=${farmId}`
          
          const config = {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
            data: {
              userId: props.userId,
              farmId: `${farmId}`,
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
            {farmData && farmData.length > 0 ? (
            <div>
                {/* Main Panel */}
                <div className="mt-4 ml-6 p-4 h-fit border-4 secondary-colour-border overflow-hidden">
                <h2 className="text-center text-lg font-medium secondary-colour-border">Farms</h2>
                    <div>
                        <div className="inline-flex rounded-md shadow-sm mb-2" role="group">
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={() => setShowCreateModal(true)}>
                                Create
                            </button>
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={async () => {
                            setShowEditModal(true);
                            await prefillEditModal(selectedFarms);
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
                                        <th className="overflow-x-hidden text-left">ID</th>
                                        <th className="overflow-x-hidden text-left">Farm Name</th>
                                        <th className="overflow-x-hidden text-left">User ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {loading ? (
                                    <tr>
                                    <td colSpan="5">Loading...</td>
                                    </tr>
                                ) : farmData.length === 0 ? (
                                    <tr>
                                    <td colSpan="5">No farms found.</td>
                                    </tr>
                                ) : (
                                    farmData.map((farm) => (    
                                    <tr key={farm.farmId}>
                                        <td className="overflow-x-hidden">
                                            <input type="checkbox" id={farm.farmId} className="appearance-none checked:bg-green-700" onChange={() => handleFarmSelection(farm.farmId)}/>
                                        </td>
                                        <td className="overflow-x-hidden">{farm.farmId}</td>
                                        <td className="overflow-x-hidden">{farm.name}</td>
                                        <td className="overflow-x-hidden">{farm.userId}</td>
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
                <h2 className="text-center text-lg font-medium secondary-colour-border">Farms</h2>
                    <div>
                        <div className="inline-flex rounded-md shadow-sm mb-2" role="group">
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={() => setShowCreateModal(true)}>
                                Create
                            </button>
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={async () => {
                            setShowEditModal(true);
                            await prefillEditModal(selectedFarms);
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
                                        <th className="overflow-x-hidden text-left">ID</th>
                                        <th className="overflow-x-hidden text-left">Farm Name</th>
                                        <th className="overflow-x-hidden text-left">User ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="5">No farms found.</td>
                                    </tr>
                                </tbody>
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
                            {/* <label className="block text-sm font-bold mx-2 text-white pt-4">Farm ID</label>
                            <input id="farmId" name="farmId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" /> */}
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Farm Name</label>
                            <input id="farmName" name="farmName"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor ID</label>
                            <input id="userId" name="userId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
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
                (selectedFarms.length > 0) ?
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour sm:w-8/12 md:w-6/12 lg:w-4/12 h-fit p-4 drop-shadow-2xl"> 
                    <form id="editForm" className="" action="#" method="POST" onSubmit={formEditSubmit}>
                        <div className="text-white mx-2">
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Farm ID</label>
                            <input id="farmId" name="farmId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Farm Name</label>
                            <input id="farmName" name="farmName"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Sensor ID</label>
                            <input id="userId" name="userId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
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
                    <h1 className="text-white pb-4">No farms selected.</h1>
                    <div>
                        <button className="black_btn mb-2" onClick={() => setShowEditModal(false)}>Close</button>
                    </div>                    
                </div>
            ) : null}

            {showDeleteModal ? (
                (selectedFarms.length > 0) ?
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour sm:w-8/12 md:w-6/12 lg:w-4/12 h-fit p-4 drop-shadow-2xl"> 
                    <div>
                        <label className="block text-sm font-bold mx-2 text-white pt-4 pb-4">Are you sure you want to delete this farm?</label>
                        <div className="pt-4">
                           <button className="red_btn mx-2 mb-2" type="submit" onClick={deleteFarm}>Delete</button>
                        </div>
                        <div>
                           <button className="black_btn mx-2 mb-2" type="delete" onClick={() => setShowDeleteModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
                : 
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour w-3/12 h-fit p-4 drop-shadow-2xl">
                    <h1 className="text-white pb-4">No farms selected.</h1>
                    <div>
                        <button className="black_btn mb-2" onClick={() => setShowDeleteModal(false)}>Close</button>
                    </div>                    
                </div>
            ) : null}
        </>
        
    )
}

export default LightPanel
