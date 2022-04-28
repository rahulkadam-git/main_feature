import api from "./api";


const complainRegistraion = async(newComplain) =>{
return await api.post("/questions",newComplain);
}



export {complainRegistraion}; 