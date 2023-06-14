"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const Name = () => {
    const [showNameModal, setShowNameModal] = useState(false);
    const [farmName, setFarmName] = useState('');
    const { user } = useAuthContext();

    // Post Request to update Farm Name
    const formSubmit = (event) => {
        event.preventDefault();
        setShowNameModal(false);
        let formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries());

        const url = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/farm?userId=1&farmId=1&name=${formObject.farmName}`

        const data = {
            userId: 1,
            farmId: 1,
            name: `${formObject.farmName}`,
        }

        const config = {
            headers:{
                authorization: `Bearer ${user.accessToken}`,
        }
        };
    
        axios.post(url, data, config);  
    }

    // Get Request to get Farm Name 
    useEffect(() => {
        // Get Request to get Farm Name    
        if (user?.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/farm`;
          const params = {
            params: {
              userId: 1,
              farmId: 1,
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
              setFarmName(response.data.name);
              console.log(farmName);
            })
            .catch((error) => {
              console.error("Error retrieving data:", error);
            });
        }
    }, [user]); 

    const deleteFarm = (event) => {
      if (user?.accessToken) {
        event.preventDefault();
        setShowNameModal(false);

        const url = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/farm?userId=1&farmId=1`
        
        const config = {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
          data: {
              sensorId: 1,
              userId: 1,
          },
        };

        axios.delete(url, config);
      }
      console.log("delete");
  }
    
    return (
        <>
            <div className="mt-4 ml-6 p-4 w-11/12 h-fit border-4 secondary-colour-border"> 
                <div>
                    <h2 className="text-center text-lg font-medium secondary-colour-border">{farmName ? farmName : "Loading..."}</h2>
                    <p className="text-center text-sm font-medium secondary-colour-border text-blue-700" onClick={() => setShowNameModal(true)}>Edit</p>
                </div>                
            </div>

            {showNameModal ? (
                <div className="absolute z-50 m-auto left-0 right-0 secondary-colour w-3/12 h-fit p-4"> 
                    <div>
                    <form className="" action="#" method="POST" onSubmit={formSubmit}>
                        <label className="block text-sm font-bold mx-2 text-white pt-4 pb-4">Edit Farm Name <span className="text-red-500" onClick={() => setShowNameModal(false)}>X</span></label>
                        <input id="farmName" name="farmName" className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                        <div className="pt-4">
                           <button className="black_btn mx-2 mb-2" type="submit">Submit</button>
                        </div>
                        <div>
                           <button className="red_btn mx-2 mb-2" type="delete" onClick={deleteFarm}>Delete</button>
                        </div>
                    </form>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Name
