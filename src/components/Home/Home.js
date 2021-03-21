import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/fakeData.json'
import SingleVehicles from '../SingleVehicles/SingleVehicles';

const Home = () => {
    const [vehicle,setVehicle] = useState([])

    useEffect(() => {
        setVehicle(fakeData)
        // console.log(vehicle);
    },[vehicle])

    

    return (
            <div className="container mt-md-5 mt-sm-3">
            <h1 className="text-capitalize text-center text-success mb-5 bg-white p-2 rounded">Welcome To BD Riders</h1>
            <div className="row">
                {
                    vehicle.map(vehicle => <SingleVehicles vehicle={vehicle} key={vehicle.id}></SingleVehicles>)
                }
            </div>
        </div>
    );
};

export default Home;