"use client"
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import axios from "axios";
import { 
        Chart as Chartjs,
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    } from 'chart.js/auto'
import { useEffect, useState } from "react"
import { Bar, Line, Scatter, Bubble } from 'react-chartjs-2'
Chartjs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Trend = () => {
    const { user } = useAuthContext();
    const [logData, setLogData] = useState({});


    useEffect(() => {
        if (user && user.accessToken) { // Check if user and accessToken exist
          const getUrl = `http://ec2-3-27-1-118.ap-southeast-2.compute.amazonaws.com/log`;
          const params = {
            params: {
              farmId: 1,
              userId: 1,
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
            //   setLoading(false);
            });
        }
    }, [user]);

    // useEffect(() => {
    //   console.log("This is being triggered from Line", logData);
    // }, [logData]);

    const [chartData, setChartData] = useState({
        datasets: []
    })

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        setChartData({
            labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
            datasets: [
                {
                    label: 'Oxygen Levels',
                    data: [15234, 124382, 19245, 16243, 28356, 14235, 31000],
                    borderColor: 'rgb(53, 162, 235',
                    backgroundColor: 'rgb(53, 162, 235, 0.4'
                }
            ]
        })

        setChartOptions({
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: "Oxygen Levels"
                }
            },
            maintainAspectRatio: true,
            responsive: true
        })
    }, [])

    return (
        <div className='mt-4 ml-6 p-4 border-4 secondary-colour-border'>
            <Line data={chartData} options={chartOptions} />
        </div>
    )
}

export default Trend