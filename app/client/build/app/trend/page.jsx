'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import Name from "@components/dashboard/Name"
import Sidebar from "@components/dashboard/Sidebar"
import BarTile from "@components/trend/BarTile"
import ScatterTile from "@components/trend/ScatterTile"
import LineTile from "@components/trend/LineTile"
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'

const Trend = () => {
    const { user } = useAuthContext();
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);
    const [logData, setLogData] = useState(true);
    let logIds;

    useEffect(() => {
        if (user && user.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-3-27-73-173.ap-southeast-2.compute.amazonaws.com/user/byuid?${user.uid}`;
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
              setUserId(response.data.userId);
            })
            .catch((error) => {
              console.error("Error retrieving data:", error);
            })
            .finally(() => {
              setLoading(false);
            });
        }
    }, [user]);

    // Get Request to get Log Object 
    useEffect(() => {
      if (user && user.accessToken) { // Check if user and accessToken exist
        const getUrl = `http://ec2-3-27-73-173.ap-southeast-2.compute.amazonaws.com/log/byuid`
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
            setLogData(response.data);
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
    if (Array.isArray(logData)) {
      logIds = logData.map((x) => x.logId);
    } else {
      logIds = [];
    }
  }, [logData]);

    return (
        <div> 
        <Sidebar/>      
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-full">
                    <Name />
                </div>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-full h-fit">
                  <BarTile logData={logIds} userId={userId}/>
                    <ScatterTile logData={logIds} userId={userId}/>
                    <LineTile logData={logIds} userId={userId}/>
                </div>          
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 w-full h-fit">
                </div>          
                </div>
            </div>
        </div>
    )
}

export default Trend