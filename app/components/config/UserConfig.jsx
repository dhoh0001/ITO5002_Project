"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const UserConfigCom = (props) => {
    
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userData, setUserData] = useState({});
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const { userId } = props;

    const handleUserSelection = (userId) => {
        setSelectedUsers((prevSelectedUsers) => {
          if (prevSelectedUsers.includes(userId)) {
            // If the user ID is already in the array, remove it
            return prevSelectedUsers.filter((id) => id !== userId);
          } else {
            // If the user ID is not in the array, add it
            return [...prevSelectedUsers, userId];
          }
        });
    };

    // Get Request to get User Object 
    useEffect(() => {
        if (user && user.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/user/byuid`;
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
              setUserData(response.data);
            })
            .catch((error) => {
              console.error("Error retrieving data:", error);
            })
            .finally(() => {
              setLoading(false);
            });
        }
    }, [user, props.uid]);

    // PUT Request to create User
    const formCreateSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries());
    
        const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/user?firstName=${formObject.firstName}&lastName=${formObject.lastName}&email=${formObject.email}&uid=${formObject.uid}`
    
        const data = { 
            userId: props.userId,
            userId: `${formObject.userId}`,
            firstName: `${formObject.firstName}`,
            lastName: `${formObject.lastName}`,
            email: `${formObject.email}`,
            uid: `${formObject.uid}`,
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

    const prefillEditModal = (selectedUser) => {
        const userArray = Object.values(userData);
        const userObject = userArray.find((user) => selectedUser.includes(user.userId));

        if (userObject) {
            setTimeout(() => {
                document.getElementById("userId").value = userObject.userId;
                document.getElementById("firstName").value = userObject.firstName;
                document.getElementById("lastName").value = userObject.lastName;
                document.getElementById("email").value = userObject.email;
            }, 0);
        }
    };

    // POST Request to edit User
    const formEditSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries())
        const userId = selectedUsers[0];


        const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/user`

        const data = { 
            userId: `${formObject.userId}`,
            firstName: `${formObject.firstName}`,
            lastName: `${formObject.lastName}`,
            email: `${formObject.email}`,
            uid: `${user.uid}`,
            // Test
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

    // DELETE request to delete User
    const deleteUser = (event) => {
        if (user?.accessToken) {
          event.preventDefault();
          setShowDeleteModal(false);
          const userId = selectedUsers[0];
  
          const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/user?userId=${userId}`
          
          const config = {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
            data: {
              userId: props.userId,
              userId: `${userId}`,
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
            {userData && userData.length > 0 ? (
            <div>
                {/* Main Panel */}
                <div className="mt-4 ml-6 p-4 h-fit border-4 secondary-colour-border overflow-hidden">
                <h2 className="text-center text-lg font-medium secondary-colour-border">Users</h2>
                    <div>
                        <div className="inline-flex rounded-md shadow-sm mb-2" role="group">
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={async () => {
                                setShowEditModal(true);
                                await prefillEditModal(selectedUsers);
                            }}>
                                Edit
                            </button>
                        </div>
                        <div className="ml-5">
                            <table className="table-auto border-separate border-spacing-2 border-4 border-black w-full">
                                <thead>
                                    <tr>
                                        <th className="overflow-x-hidden text-left"></th>
                                        <th className="overflow-x-hidden text-left">User ID</th>
                                        <th className="overflow-x-hidden text-left">First Name</th>
                                        <th className="overflow-x-hidden text-left">Last Name</th>
                                        <th className="overflow-x-hidden text-left">email</th>
                                    </tr>
                                </thead>
                                <tbody id="userTable">
                                {loading ? (
                                    <tr>
                                    <td colSpan="5">Loading...</td>
                                    </tr>
                                ) : userData.length === 0 ? (
                                    <tr>
                                    <td colSpan="5">No users found.</td>
                                    </tr>
                                ) : (
                                    userData.map((user) => (
                                    <tr id={user.userId} key={user.userId}>
                                        <td className="overflow-x-hidden">
                                        <input type="checkbox" id={user.userId} className="appearance-none checked:bg-green-700" onChange={() => handleUserSelection(user.userId)}/>
                                        </td>
                                        <td className="overflow-x-hidden">{user.userId}</td>
                                        <td className="overflow-x-hidden">{user.firstName}</td>
                                        <td className="overflow-x-hidden">{user.lastName}</td>
                                        <td className="overflow-x-hidden">{user.email}</td>
                                        {/* <td>{user ? "🟢" : "🔴"}</td> */}
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
                <h2 className="text-center text-lg font-medium secondary-colour-border">Users</h2>
                    <div>
                        <div className="inline-flex rounded-md shadow-sm mb-2" role="group">
                            <button type="button" className="px-4 py-2 text-sm font-medium dash_btn" onClick={async () => {
                                setShowEditModal(true);
                                await prefillEditModal(selectedUsers);
                            }}>
                                Edit
                            </button>
                        </div>
                        <div className="ml-5">
                            <table className="table-auto border-separate border-spacing-2 border-4 border-black w-full">
                                <thead>
                                    <tr>
                                        <th className="overflow-x-hidden text-left"></th>
                                        <th className="overflow-x-hidden text-left">User ID</th>
                                        <th className="overflow-x-hidden text-left">First Name</th>
                                        <th className="overflow-x-hidden text-left">Last Name</th>
                                        <th className="overflow-x-hidden text-left">email</th>
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
                            <label className="block text-sm font-bold mx-2 text-white pt-4">User ID</label>
                            <input id="userId" name="userId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">First Name</label>
                            <input id="firstName" name="firstName"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Last Name</label>
                            <input id="lastName" name="lastName"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Email</label>
                            <input id="email" name="email"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
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
                <div className="absolute z-50 m-auto top-0 bottom-0 left-0 right-0 secondary-colour sm:w-8/12 md:w-6/12 lg:w-4/12 h-fit p-4 drop-shadow-2xl"> 
                    <form className="" action="#" method="POST" onSubmit={formEditSubmit}>
                        <div className="text-white mx-2">
                            <label className="block text-sm font-bold mx-2 text-white pt-4">User ID</label>
                            <input id="userId" name="userId"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">First Name</label>
                            <input id="firstName" name="firstName"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Last Name</label>
                            <input id="lastName" name="lastName"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <label className="block text-sm font-bold mx-2 text-white pt-4">Email</label>
                            <input id="email" name="email"  className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                            <div id="errorMessage" className='block text-sm font-medium leading-6 text-white'></div>
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
                        <label className="block text-sm font-bold mx-2 text-white pt-4 pb-4">Are you sure you want to delete this user?</label>
                        <div className="pt-4">
                           <button className="red_btn mx-2 mb-2" type="submit" onClick={deleteUser}>Delete</button>
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

export default UserConfigCom
