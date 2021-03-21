import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './Destination.css'
import { useParams } from 'react-router';
import fakeData from '../../fakeData/fakeData.json'


const Destination = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const {id} = useParams();
    const raider = fakeData.find(vehicleId => vehicleId.id == id)
    const [user,setUser] = useState({
        from: '',
        to: ''
      })
      const handelBlur = (e) => {
        let isFieldValid ;
        if(e.target.name === 'from'){
          isFieldValid = e.target.value
        }
        if (e.target.name === 'to') {
          isFieldValid = e.target.value;
        }
        if (isFieldValid) {
          const newUserInfo = {...user}
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo); 
        }
        console.log(isFieldValid);
      }
      const handelSearch = (e) => {
          setUser(user)
            e.preventDefault()
      }
    return (
        <div className="container pt-4">
            <div className="row"> 
                    <div className="col-md-4 mb-4">
                        <div className="input-container rounded">
                            <div>
                                <form action="" onSubmit={handelSearch}>
                                    <label htmlFor="from">Pick From</label>
                                    <input onBlur={handelBlur} id="from" name="from" ref={register({ required: true })} />

                                    <label htmlFor="to">Pick To</label>
                                    <input onBlur={handelBlur} id="to" name="to" ref={register({ required: true })} />
                                    <br/>
                                    <input type="submit" value="Search" className="search-btn"/>
                                </form>

                            </div>
                            
                            <div className="show-results d-flex justify-content-between align-items-center pt-3">
                                <div className="d-flex align-items-center">
                                    <h4 className="text-capitalize">From: {user.from}</h4>
                                </div>
                                <div className="d-flex align-items-center">
                                    <h4 className="text-capitalize">To: {user.to}</h4>
                                </div>
                            </div>

                            <div className="show-results d-flex justify-content-between align-items-center pt-3">
                                <div className="d-flex align-items-center">
                                    <img src={raider.img} alt=""/>
                                    <p className="text-capitalize ml-2">{raider.name}</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p className="mr-2"><i className="fas fa-user-friends"></i> 3</p>
                                    <p>$57</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                <div className="col-md-8 mb-4">
                <iframe style={{height:'500px'}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3698195.6200339003!2d88.10022404276282!3d23.490582534793855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adaaed80e18ba7%3A0xf2d28e0c4e1fc6b!2sBangladesh!5e1!3m2!1sen!2sbd!4v1616293201536!5m2!1sen!2sbd"></iframe>
                </div>
                
            </div>
        </div>
    );
};

export default Destination;