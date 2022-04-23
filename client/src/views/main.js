import React, { useState,useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import { useUser } from "../context/userContext";
import logout from "../actions/logout"
import axios from "axios"

const Main = () => {

    const navigate = useNavigate()
    const [pirates,setPirates] = useState();
    const { user, setUser } = useUser();

    const renderInfo = () => {
        if (user) {
            return (<div>
                <h4>Bienvenido Pirata {user.firstName.toUpperCase()}</h4>
                <button onClick={logOut} className="btn btn-danger  border border-dark">LOGOUT</button>
            </div>)
        } else {
            return (<div>
                <h4>Requiere iniciar sesion</h4>
                <button onClick={()=> navigate("/")} className="btn btn-primary  border border-dark">Iniciar Sesion</button>
                </div>)
        }
    }

    const getPirates = async() => {
        const response = await axios.get("/api/pirates");
        console.log(response);
        setPirates(response.data.pirates);
    }

    useEffect(() => {
        getPirates()
    },[])

    const logOut = async () => {
        const { success } = await logout();
        if (success) setUser(null);
        else window.alert("Error, could not log out");
        navigate("/");
      };

      const deletePirate = (idPirate) => {
        axios.delete('/api/pirates/delete/'+idPirate )
        .then((res) => {
            getPirates();
            navigate("/pirates")
        })
    }

    return (
        <div>
            <div className='headerh1'>
                <h1 className='d-inline col-md-6 offset-md-3'>Pirate Crew </h1>
                <button onClick={()=> navigate("/pirates/new")} className="btn btn-primary  border border-dark col-1 offset-md-4 d-inlin">Add Pirate</button>               
            </div>
            <div>
                <h2>{renderInfo()} </h2>
            </div>
            <div className="container">
                {pirates?.map((pirate,i) => {
                    return(
                        <div key={i} className="bg-light w-75 m-4 p-3 border border-dark">
                        <h1 >{pirate.name}</h1>
                        <img className="imgMain" src={pirate?.image} alt="foto pirata" />
                        <button onClick={()=> navigate("/pirates/"+pirate?._id)} className="btn btn-primary  border border-dark m-2">View Pirate</button>
                        <button onClick={()=> deletePirate(pirate?._id)} className="btn btn-danger  border border-dark m-2">Walk the Plank</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Main;
