import rolesModel from "../Model/roles.model.js";

/**POST : http://loaclhost:8000/api/role/addrole 
/* @param :{
    "role":"user",
    "permission":[add]
}
*/
export async function addRole(req, res) {
    try {
        const {role,permissions}=req.body;

        const newrole=await new rolesModel({role,permissions});
        const isSaved =await newrole.save();
        if(isSaved){

            return res.send({code:200,message:'role added'})
        }
        else{
            return res.send({code:500,message:'server error'})
        }

    } catch (error) {
      return res.status(501).send(Error);
    }
  }

/**POST : http://loaclhost:8000/api/role/deleterole 
/* @param :{
    "fullName":"ashok purohit",
    "email":"ash123@gmail.com",
    "gender":"male",
    "password":"ash123@"
}
*/
export async function deleterole(req, res) {
    try {
      return res.send({code:200,message:'role Deleted'})
    } catch (error) {
      return res.status(501).send(Error);
    }
  }