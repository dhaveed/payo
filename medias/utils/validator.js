const joi = require('joi');

module.exports = (schema) => {
    return (req, res, next)=>{
        joi.validate(req.body, schema, {abortEarly: false, convert: true, stripUnknown: true},(err, value) => {
            if(!err){
                req.bodyOld = req.body;
                req.body = value;
                next()
            }else{
                //res.status(400).json(err);
                res.status(400).json(err.details.reduce((acc, cur)=> Object.assign(acc,{[cur.context.label || cur.context.key]:cur.message.replace(new RegExp('\"','ig'),'')}) ,{}) );
            }
        })
    }
}
