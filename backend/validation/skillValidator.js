
exports.createSkillValidator = createSkill =(req,res,next)=>{
    const {name , technologies} = req.body;
    if(!name){
        res.status(400).send({message:'name is required'})
    }
    if(!technologies){
        res.status(400).send({message:'technologies is required'})
    }
    next()
}
exports.updateSkillValidator = createSkill =(req,res,next)=>{
    if(req.body.length <= 0){
        res.status(400).send({message:'at least give something to change'})
    }
    next()
}
