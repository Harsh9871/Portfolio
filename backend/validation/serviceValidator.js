const  Services = require("../model/services.js");

exports.validateCreateService = async (req, res,next) => {
    const{ name, description,keyPoints , svg } = req.body;
    if(!name){
        res.status(400).json({
            error: 'Please enter name'
        })
    }
    if(!description){
        res.status(400).json({
            error: 'Please enter description'
        })
    }
    if(!svg){
        res.status(400).json({
            error: 'Please enter svg'
        })
    }
    if(!keyPoints ){
        res.status(400).json({
            error: 'Please enter keyPoints key'
        })
    }
    next()
}

exports.validateServicesById = async (req,res,next) =>{
    const result = Services.find(req.params.id);
    if(!result){
        res.status(404).json({
            error: 'Can not find service'
        })
    }
    next()
}