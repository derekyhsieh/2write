import { useState, useEffect } from "react";

const useCheckUser = () => {

    const [loggedInUser, setLoggedInUser] = useState<string | null>(null)

   
    function checkUserState() {
        const loggedInUser = localStorage.getItem("user");

        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setLoggedInUser(foundUser);
        }
    }


    useEffect(() => {
      
        checkUserState()

      }, []);

      return [loggedInUser, setLoggedInUser, checkUserState]
}

export default useCheckUser;