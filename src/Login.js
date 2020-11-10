import React from 'react'
import {Button} from  "@material-ui/core"
import "./Login.css"
import {auth, provider} from "./firebase"
import {actionTypes} from "./reducer"
import {useStateValue} from "./StateProvider";

function Login() {

  const [{}, dispatch] = useStateValue();

   const googleSignIn = ()=> {
     auth.signInWithPopup(provider).then((result) =>
     {
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      })
     }
     ).catch((error) => alert(error.message))
   }

    return (
        <div className="login">
          <div className="login-container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="whatsapp-logo">
            </img>
            <div className="login-text">
              <h1>Sign in to Whatsapp </h1>
            </div>

            <Button type="submit" onClick={googleSignIn} className="login-button">
              Sign in with Google
            </Button>
          </div>
        </div>
    )
}

export default Login
