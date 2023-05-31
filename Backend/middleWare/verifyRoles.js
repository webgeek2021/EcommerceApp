
const verifyRoles = (...allowedRoles ) =>{
    return (req,res,next)=>{
        console.log("ROLES",req.headers)
        if(!req?.roles) return res.sendStatus(401) // unauthorized

        const rolesArray = [...allowedRoles]

        console.log(rolesArray)
        console.log(req.roles)

        const results = req.roles.map((role)=> rolesArray.includes(role)).find(val => val === true);
        console.log("Results" , results)
        if(!results){
            return res.sendStatus(401)
        }
        next();
    }
}

module.exports = verifyRoles