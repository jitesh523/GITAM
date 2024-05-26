/* In the provided code snippet, the UserContext is created 
using createContext(). This context will hold the user information, 
and any component within the context's provider can access this 
information without the need to pass it down explicitly through props. */

import { createContext, useState } from "react";

//Create a context (More like initializing a data structure)
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

/*
Here's an analogy: Imagine a library (the context). You can have a catalog (the UserContext) 
that lists the types of books available (data structure). Librarians (the UserContextProvider)
 manage the actual books (data) by adding, removing, and keeping track of them. They use the 
 catalog to understand what kind of books the library holds, but the catalog itself doesn't 
 manage the physical books.
*/

/*
The Provider component is responsible for making the context value available 
to its child components.
*/

/*
The value prop is used to specify the data that will be accessible through the context. 
In this case, it's an object containing both userInfo and setUserInfo.
*/
