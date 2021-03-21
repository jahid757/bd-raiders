import { Link } from 'react-router-dom';
import './SingleVehicles.css'
const SingleVehicles = (props) => {

    const {name,img,id} = props.vehicle
    return (
        <div className="col-md-3 col-sm-6 mb-3">
            <Link to={"/destination/"+ id}>
                <div className="info rounded">
                    <img src={img} alt=""/>
                    <h3 className="text-uppercase text-black">{name}</h3>
                </div>
            </Link>
        </div>
    );
};

export default SingleVehicles;