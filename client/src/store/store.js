import {create} from 'zustand';

export const useAuthStore = create((set)=>({
    auth:{
        email:'',
    },
    setEmail:(e)=>
    set((state)=>({
        auth :{...state.auth,email:e}
    })),
    
}));
