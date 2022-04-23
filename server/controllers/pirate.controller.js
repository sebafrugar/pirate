const { Pirate , PirateSchema } = require("../models/pirate.models")

module.exports.createNewPirate = async (req, res)=>{
    try{
        const pirateCapitain = await Pirate.find({role:"Captain"}).exec();
        if (pirateCapitain.length===1 && req.body.role === "Captain"){
            res
            .status(500)
            .json({ errors: { error: { message: "Ya existe un Capitan" } } });
        }else{
            const pirate = new Pirate(req.body);
            await pirate.save();
            return res
                .json({pirate:pirate});
        }

    }catch(error){
        res.status(500).json(error);
    }
}

module.exports.findAllPirates = (req,res) => {
    Pirate.find().sort({name:'asc'})
        .then((allPirates)=>res.json({pirates:allPirates}))
        .catch((err)=>res.json({message:"Algo salio mal",error:err}))
}

module.exports.findOnePirate= (req,res)=>{
    Pirate.findOne({_id: req.params.id})
        .then((pirate)=>res.json({pirate:pirate}))
        .catch((err)=>res.json({message:"Algo salio mal",error:err}))
}

module.exports.changeSkill = async (req,res) => {

    try {
        const pirate = await Pirate.findById(req.params.id);

        if(req.params.skill === "1"){
            pirate.skill1=!pirate.skill1;
        }
        if(req.params.skill === "2"){
            pirate.skill2=!pirate.skill2;
        }
        if(req.params.skill === "3"){
            pirate.skill3=!pirate.skill3;
        }

        await pirate.save();
            return res
                .json({pirate:pirate});

    }catch(err){
        res.status(500).json(err);
    }
}

module.exports.deletePirate = (req,res)=>{
    Pirate.deleteOne({_id: req.params.id})
    .then((result)=>res.json({resultado:result}))
    .catch((err)=>res.json({message:"Algo salio mal",error:err}))
}