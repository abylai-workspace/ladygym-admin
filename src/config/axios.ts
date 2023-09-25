import { instance } from "./api"



export const getAllClients = async(token: any) => {
    try {
        const response=instance.get('/gym/user/all',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response
        
    } catch (error:any) {
        throw new Error(error)
        
    }
}


export const getAllPersonals = async(token: any) => {
    try {
        const response=instance.get('/gym/user/personal',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response
        
    } catch (error:any) {
        throw new Error(error)
        
    }
}

// "firstName": "Islam",
// "lastName": "Zavotpayev",
// "email": "elat@mail.ru",
// "phoneNumber": "77756830757",
// "password": "123",
// "role": "TRAINER",
// "gymId":"1"

export const createUserAndPersonal = async(token: any,data:any) => {
    try {
        const response=instance.post('/gym/user/create', data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response
        
    } catch (error:any) {
        throw new Error(error)
        
    }


}
export const gymTrainers = async(token: any) => {
    try {
        const response=instance.get('/gym/user/trainers',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response
        
    } catch (error:any) {
        throw new Error(error)
        
    }
}

export const VisitCounterClients =async(token: any) => {
    try {
        const response=instance.get('/gym/subscriptions/manage/all',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response
        
    } catch (error:any) {
        throw new Error(error)
        
    }
}
export const createUser= (firstName:string, lastName:string, password:string,phoneNumber:string) => {
    try {
        const response=instance.post('/gym/auth/registration', {
            firstName,
            lastName,
            password,
            phoneNumber,   
        })
       
        return response
        
    } catch (error) {
        console.log(error)
        
    }
    
}

export const gymManageAll= () => {
    try {
        const response=instance.get('/gym/manage/all')
        return response
        
    } catch (error) {
        console.log(error)
        
    }

}

export const getFreezeAll= async(token:string) => {
    try {
        const response=await instance.get('/gym/subscriptions/freeze/all',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response
        
    } catch (error) {
        
    }
    
}

export const deletePersonal = async(token:string,id:string) => {
    try {
        const response=await instance.delete(`/gym/user/delete/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
      
        return response
        
    } catch (error) {
        
    }
}

export const updatePersonal = async(token:string,id:string,data:any) => {
    try {
        const response=await instance.post(`/gym/user/edit/${id}`, data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
      
        return response
        
    } catch (error) {
        
    }
}