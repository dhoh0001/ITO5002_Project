'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import Name from "@components/dashboard/Name"
import Sidebar from "@components/dashboard/Sidebar"
import BarTile from "@components/trend/BarTile"
import ScatterTile from "@components/trend/ScatterTile"
import LineTile from "@components/trend/LineTile"
import BubbleTile from "@components/trend/BubbleTile"
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'

const Trend = () => {
    const { user } = useAuthContext();
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);
    const [logData, setLogData] = useState({});
    const [logDataArray, setlogDataArray] = useState({});
    let logIds;

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

  useEffect(() => {
    if (user && user.accessToken) { // Check if user and accessToken exist
      let getUrl = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/data/dataforuser`; 
      const params = {
        params: {
          userId: userId,
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
            setlogDataArray(response.data) 
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
}, [userId]);

    return (
        <div> 
        <Sidebar/>      
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-full">
                    <Name />
                </div>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-full h-fit">
                  <BarTile logDataArray={logDataArray}/>
                  <ScatterTile logDataArray={logDataArray}/>
                  <LineTile logDataArray={logDataArray}/>
                  <BubbleTile logDataArray={logDataArray}/>
                </div>          
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 w-full h-fit">
                </div>          
                </div>
            </div>
        </div>
    )
}

export default Trend