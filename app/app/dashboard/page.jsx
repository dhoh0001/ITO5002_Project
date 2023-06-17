'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import Panel from "@components/dashboard/Panel"
import LightPanel from "@components/dashboard/LightPanel"
import Sensor from "@components/dashboard/Sensor"
import Name from "@components/dashboard/Name"
import Sidebar from "@components/dashboard/Sidebar"
import Link from 'next/link';
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'

const Farm = () => {
    const { user } = useAuthContext();
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-3-26-101-210.ap-southeast-2.compute.amazonaws.com/user/byuid?${user.uid}`;
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

    // useEffect(() => {
    //     console.log("userId", userId);
    // }, [userId]);

    return ( 
        <div> 
            <Sidebar userId={userId}/>      
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                        <Name userId={userId}/>
                    </div>
                    <LightPanel userId={userId}/>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                        <Sensor userId={userId}/>
                        <Sensor userId={userId}/>
                        <div>
                            <Link href="trend" className="dash_btn">
                                View Trends
                            </Link>
                            <Link href="alert" className="dash_btn">
                                Configure Alerts
                            </Link> 
                        </div>
                    </div>          
                </div>
            </div>
        </div>
    )
}

export default Farm
