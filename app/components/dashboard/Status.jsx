"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";

const StatusPanel = (props) => {
    
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [statusData, setStatusData] = useState([]);
    const [selectedStatuss, setSelectedStatuss] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const { userId, farmId } = props;

    useEffect(() => {  
        if (user && user.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/data/dataforuser`;
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
          console.log(response.data);
          setStatusData(response.data);
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
      }
    }, [user]); 

    return (
        <>
        <div className="mt-4 ml-6 h-fit">
            <table className="table-auto border-separate border-spacing-2 border-4 border-black w-full">
                <thead>
                    <tr>
                    <th className="text-left"></th>
                        <th className="overflow-x-hidden text-left">Log ID</th>
                        <th className="overflow-x-hidden text-left">Alert Name</th>
                        <th className="overflow-x-hidden text-left">Value</th>
                        <th className="overflow-x-hidden text-left">Alert Upper Level</th>
                        <th className="overflow-x-hidden text-left">Alert Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    statusData.map((status) => (    
                        <tr key={status.statusId}>
                            <td className="overflow-x-hidden">
                                <input type="checkbox" id={status.statusId} className="appearance-none checked:bg-green-700" onChange={() => handleStatusSelection(status.statusId)}/>
                            </td>
                            <td className="overflow-x-hidden">{status.logId}</td>
                            <td className="overflow-x-hidden">{status.name}</td>
                            <td className="overflow-x-hidden">{status.value? status.value : 'No Value'}</td>
                            <td className="overflow-x-hidden">{status.alertLevel}</td>
                            <td className="overflow-x-hidden">{status.value >= status.alertLevel? ' 🔴' :' 🟢 '} </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
       </>
        
    )
}

export default StatusPanel
