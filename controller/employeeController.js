import Employee from  '../Models/employee.schema.js';

export const createEmployee = async(req,res) => {
    try{
        const newEmployee = new Employee(req.body)
        await newEmployee.save();
        res.status(200).json({message:"Emp Added Successfully", data:newEmployee})
    }catch(error){
        console.log(error);
    }
    
}