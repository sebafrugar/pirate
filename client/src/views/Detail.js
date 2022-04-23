import React,{useState,useEffect} from 'react';
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios';

const Detail = () => {

    const {id} = useParams();
    const [pirate, setPirate] = useState({})
    const navigate = useNavigate();
    const [skill1, setSkill1] = useState();
    const [skill2, setSkill2] = useState()
    const [skill3, setSkill3] = useState()

    useEffect(() => {
        axios.get("/api/pirates/" + id)
            .then((res)=>{
                setPirate(res.data.pirate);
                console.log(res.data.pirate);
                setSkill1(res.data.pirate.skill1);
                setSkill2(res.data.pirate.skill2);
                setSkill3(res.data.pirate.skill3);
            })
    }, [])

    const changeSkill = (skillNumber) => {
        axios.post('/api/pirates/changeskill/'+skillNumber+"/"+id)
        .then(res=>{
            console.log("resulto")
            if(skillNumber === 1){
                const original = skill1;
                console.log(original);
                setSkill1(!original);
            }
            if(skillNumber === 2){
                const original = skill2;
                setSkill2(!original);
            }
            if(skillNumber === 3){
                const original = skill3;
                setSkill3(!original);
            }

        }).catch((err)=>{
            console.log(err.response)
        })
    }

    return (
        <div className="container">
            <div>
            <h1 className='headerh1'>Deep Sea {pirate.name}</h1>
            <button onClick={()=> navigate("/pirates")} className="btn btn-primary  border border-dark"> Back main </button>
            </div>
            <div className="row justify-content-evenly">
                <div className='p-4 m-5 text-dark w-25 d-inline-block col-4'>
                    <img className="imgDetalle" src={pirate?.image} alt="foto pirata" />
                    <h4>"{pirate.frase}"</h4>
                </div>
                <div className='p-4 m-5 bg-white text-dark w-25 d-inline-block text-start border border-dark col-4'>
                    <h2>About</h2>
                    <p>Position : {pirate.role}</p>
                    <p>Treasures: {pirate.treasures}</p>
                    <p className='d-inline-block'>Peg Leg: {skill1?"SI":"NO"} </p> <button onClick={()=>changeSkill(1)}>{skill1?"NO":"SI"}</button><br></br>
                    <p className='d-inline-block'>Eye Patch: {skill2?"SI":"NO"} </p> <button onClick={()=>changeSkill(2)}>{skill2?"NO":"SI"}</button><br></br>
                    <p className='d-inline-block'>Hook Hand: {skill3?"SI":"NO"} </p> <button onClick={()=>changeSkill(3)}>{skill3?"NO":"SI"}</button>
                </div>
            </div>    
        </div>
    );
}

export default Detail;
