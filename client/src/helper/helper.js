import axios from 'axios';


import jwt_decode from 'jwt-decode';

axios.defaults.baseURL=process.env.REACT_APP_SERVER_DOMAIN;



//admin
export async function loginAdmin({email,password}){
    try {
        if(email){
            const {data} =await axios.post('/api/adminlogin',{email,password});
            return Promise.resolve({data});
        }
    } catch (error) {
        return Promise.reject({error:"Password doesn't Match ...!",e:error.message})
    }
}

export async function addLocation(credentials){
    try {
        // console.log(crendentials)
        
        //     const {data} =await axios.post('/api/addlocation',crendentials);
        const formData = new FormData();

        // Append each field to the FormData object
        formData.append('name_location', credentials.name_location);
        formData.append('space_location', credentials.space_location);
        formData.append('owner_contact', credentials.owner_contact);
        formData.append('user_type', credentials.user_type);
        formData.append('amount', credentials.amount);
        formData.append('description', credentials.description);
        formData.append('latitude', credentials.latitude);
        formData.append('longitude', credentials.longitude);
    
        // Append the 'photo' field with the File object
        formData.append('photo', credentials.photo);
    
        // Use the FormData object as the data to send in the request
        const { data } = await axios.post('/api/addlocation', formData);
            return Promise.resolve({data});
        
    } catch (error) {
        return Promise.reject({error:"Location not added ...!",e:error.message})
    }
}

export async function getlocation({user_type}) {
    try {
      const response = await axios.get(`/api/getlocation?user_type=${user_type}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }




/** to get email from Token */
export async  function getEmail(){
    const token = localStorage.getItem('token');
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token);
    console.log(decode)
    return decode
}

/** Make Api Request */

export async function getAllUsers() {
    try {
      const response = await axios.get('/api/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }




/**authenticate fuction */
export async function authenticate(email){
    try {
        return await axios.post('/api/authenticate',{ email})
    } catch (error) {
        console.log(`error message:${error.message}`)
        return {error :"User Doesn't Exist ....!"}
    }
}

/* get User details */
export async function getUser({email}){
    try {
       const {data}= await axios.get(`/api/user/${email}`)
       return {data};
    } catch (error) {
        return {error:"Password Doesn't Match"}
    }
}


/** Register User Function */
export async function registerUser(crendentials){
    try {
       const {data:{msg},status}= await axios.post(`/api/register`,crendentials);
       let {fullName,email} =crendentials;
       /*send  email */
    //    if(status === 201){
    //     await axios.post('/api/registerMail',{ fullName,userEmail:email,text:msg})

    //    }
       return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({error:'User Exist--!'});
    }
}

/* Login function */

export async function loginUser({email,password}){
    try {
        if(email){
            const {data} =await axios.post('/api/login',{email,password});
            return Promise.resolve({data});
        }
    } catch (error) {
        return Promise.reject({error:"Password doesn't Match ...!"})
    }
}


/*Update user function */
export  async function updateUser(response){
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser',response,{headers:{"Authorization":`Bearer ${token}`}});
        return Promise.resolve({ data});
    } catch (error) {
        return Promise.reject({error:"Couldn't Update Profile ...!"})
    }
}

/* generate OTP */
export async function generateOTP(email){
    try {
        const {data:{code},status}=await axios.get('api/generateOTP',{params:{email}})
        //send Otp to Mail
        console.log(code,"from helper")
        // if(status === 201){
        //     let {data:{fullName}} =await  ({email});
        // //     //taking full Name from whole data
        //     let text = `Your Password Recovery Otp is ${code}.Verify and recover your Password.`;
        // //     // await axios.post('/api/registerMail',{fullName:fullName,userEmail:email,text,subject:"Password Recovery Otp"})
        // // }
        return Promise.resolve(code);
    }

    catch(error) {
        return Promise.reject({error})
    }
}

/* verify Otp */
export async function verifyOTP({email,code}){
    try {
        const {data,status}=await axios.get('/api/verifyOTP',{params:{email,code}})
        return {data,status}
    } catch (error) {
        return Promise.reject({error:"Wrong Otp"});
    }
}

/**Reset Password  */
export async function resetPassword({email,password}){
    try {
        const {data,status}=await axios.put('api/resetPassword',{email,password})
        return Promise.resolve({data,status})
    } catch (error) {
        return Promise.reject({error})
    }
}