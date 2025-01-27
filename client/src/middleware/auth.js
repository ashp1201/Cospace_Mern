// import { Navigate } from "react-router-dom";
// // import { useAuthStore } from "../store/store";

// import { useLocation } from 'react-router-dom';




// //for to update user information
// export const AuthorizeUser = ({children})=>{
//     // const token =localStorage.getItem('token');
//     const token='';
//     const cookies = document.cookie.split(';');


//     for (const cookie of cookies) {
//       const [name, value] = cookie.trim().split('=');
//       if (name === 'token') {
//         token = value;
//         break;
//       }
//     }


//     if(!token){
//         return <Navigate to={'/'} replace={true}></Navigate>
//     }
//     return children
// }


// //to change Password or set Password

// export const ProtectRoute =({children})=>{
//   const location=useLocation();
//     const email=location.state.email;
//     if(!email)
//     {
//         return <Navigate to={'/pagenotfound'} replace={true}></Navigate>
//     }
//     return children;
// }