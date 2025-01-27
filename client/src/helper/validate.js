//validate user name
import toast from 'react-hot-toast';
import { authenticate } from './helper';

export async function userValidate(values){
    const errors =userVerify({},values);
    if (values.email){
        //check user exist or not
        const { status } = await authenticate(values.email)
        if (status!== 200){
            errors.exist =toast.error('User does not Exist')
        }
    }

    return errors;
} 

export async function adminValidate(values){
    const errors =userVerify({},values);
    // if (values.email){
    //     //check user exist or not
    //     const { status } = await authenticate(values.email)
    //     if (status!== 200){
    //         errors.exist =toast.error('User does not Exist')
    //     }
    // }

    return errors;
} 

export async function emailValidate(values){
    const errors =emailVerify({},values);
    if (values.email){
        //check user exist or not
        const { status } = await authenticate(values.email)
        if (status!== 200){
            errors.exist =toast.error('User does not Exist')
        }
    }
    return errors;
} 

function emailVerify(error ={},values){

    if (!values.email ){
        error.email =toast.error("Email Required");
    }
    else if(values.email.includes(" ") ){
        error.email=toast.error('Invalid email...!')
    }
    return error;
}


//validate email
function userVerify(error ={},values){
    const specialChars = /[`~!@&#*]/ ;

    if (!values.email ){
        error.email =toast.error("Email Required");
    }
    else if (!values.password ){
        error.password =toast.error("Password Required");
    }
    else if(values.email.includes(" ") ){
        error.email=toast.error('Invalid email...!')
    }
    else if(values.password.includes(" ")){
        error.password=toast.error('Invalid password ...!')
    }
    else if (values.password.length<4){
        error.password=toast.error('Password must be more than 4 character')
    }
    else if (!specialChars.test(values.password)){
        error.password=toast.error('Password must have Special Character')
    }
    return error
}


//reister validate
export async function registerValidate(values){
    const errorss =rVerify({},values);
    console.log(errorss);
    return errorss;
} 
//validate 

function rVerify(error ={},values){
    const specialChars = /[`~!@&#*]/ ;
    if (!values.username ){
        error.email =toast.error("Username Required");
    }
    else if (!values.email ){
        error.email =toast.error("Email Required");
    }
    else if (!values.password || !values.c_password){
        error.password =toast.error("Password Required");
    }
    else if(values.email.includes(" ") ){
        error.email=toast.error('Invalid email...!')
    }
    else if(values.password.includes(" ") || values.password.includes(" ")){
        error.password=toast.error('Invalid password ...!')
    }
    else if (values.password.length<4 || values.c_password.length<4 ){
        error.password=toast.error('Password must be more than 4 character')
    }
    else if (!specialChars.test(values.password)){
        error.password=toast.error('Password must have Special Character')
    }
    else if(values.password !== values.c_password){
        error.exist=toast.error("Password not match ...!")
    }
    return error
}



export async function passwordValide(values){
    
    const errors =passwordVerify({},values)
    return errors;
}

function passwordVerify(error={},values){
    const specialCharss = /[`~!@&#*]/ ;
    if (!values.password || !values.c_password){
        error.password =toast.error("Password Required");
    }
    
    else if(values.password.includes(" ") || values.c_password.includes(" ")){
        error.password=toast.error('Invalid password ...!')
    }
    else if (values.password.length<4 || values.c_password.length<4 ){
        error.password=toast.error('Password must be more than 4 character')
    }
    else if (!specialCharss.test(values.password)){
        error.password=toast.error('Password must have Special Character')
    }
    else if(values.password !== values.c_password){
        error.exist=toast.error("Password not match ...!")
    }
    return error
}
