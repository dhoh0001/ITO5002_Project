'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import LogPanel from "@components/dashboard/LogPanel"
import SensorPanel from "@components/dashboard/SensorPanel"
import AlertPanel from "@components/dashboard/AlertPanel"
import UserPanel from "@components/dashboard/UserPanel"
import Sensor from "@components/dashboard/Sensor"
import Name from "@components/dashboard/Name"
import Sidebar from "@components/dashboard/Sidebar"
import Link from 'next/link';
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'

const Farm = () => {
    const { user } = useAuthContext();
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);
    const [farmId, setFarmId] = useState('');
    const [logId, setLogId] = useState([]);

    useEffect(() => {
        if (user && user.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/user/byuid?${user.uid}`;
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
              setUserId(response.data[0].userId);
              // setUserId(response.data.userId);
            })
            .catch((error) => {
              console.error("Error retrieving data:", error);
            })
            .finally(() => {
              setLoading(false);
            });
        }
    }, [user]);

    // Get Request to get Farm Id 
    useEffect(() => { 
      if (user?.accessToken) { // Check if user and accessToken exist
        const getUrl = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/farm/byuid`;
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
            setFarmId(response.data[0].farmId || '');
          })
          .catch((error) => {
            console.error("Error retrieving data:", error);
          });
      }
    }, [user]); 

      // Get Request to get Log Object 
      useEffect(() => {
          if (user && user.accessToken) { // Check if user and accessToken exist
            const getUrl = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/log/byuid`
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
                response.data
                setLogId(response.data.map((x) => x.logId) || []);
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
        <div> 
            <Sidebar userId={userId}/>      
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                      <Name userId={userId} farmId={farmId}/>
                      <UserPanel userId={userId} /> 
                    </div>
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                      <LogPanel userId={userId} farmId={farmId}/>
                      <SensorPanel userId={userId} />    
                    </div>

                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                      <AlertPanel userId={userId} farmId={farmId} logId={logId}/>
                    </div>
    
                </div>
            </div>
        </div>
    )
}

export default Farm