// EmailContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context
export const EmailContext = createContext(null);

// // Create a provider component
// export function EmailProvider({ children }) {
//   const [email, setEmail] = useState('');

//   return (
//     <EmailContext.Provider value={{ email, setEmail }}>
//       {children}
//     </EmailContext.Provider>
//   );
// }

// // Create a custom hook to access the context
// export function useEmail() {
//   return useContext(EmailContext);
// }
