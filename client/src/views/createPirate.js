import React,{ useState } from 'react';
import Pirateform from '../components/PirateForm';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Createpirate = () => {

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const createPirate = (values) => {
        console.log(values);

        axios.post('http://localhost:8000/api/pirates/new', values)
        .then(res=>{
            console.log("exitoso");
            navigate("/pirates");
        }).catch((err)=>{
            console.log(err.response)
            const errorResponse = err.response.data.errors;
            console.log(errorResponse);
                const errorArr=[];
                for(const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
        })
    }

    return (
        <div>
            <div className='headerh1'>
                <h1 className='d-inline col-md-6 offset-md-3'>Add Pirate </h1>
                <button onClick={()=> navigate("/pirates")} className="btn btn-primary  border border-dark col-1 offset-md-4 d-inline" >Crew Board</button>               
            </div>
            <div>
                {errors.map((err)=><div className={`alert alert-danger`} >{err} </div>)}
                <Pirateform onSubmitProp={createPirate}></Pirateform>
            </div>   
        </div>
    );
}

export default Createpirate;
