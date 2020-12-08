import React from "react";
import {isAuthenticated} from "../auth"
import {remove} from "./Userapi";
import {signout} from "../auth"
import { Redirect } from "react-router-dom";

export default function DeleteUser(props){

    const [redirect,setRedirect] = React.useState(false)

        const deleteAccount = () =>{
            const token = isAuthenticated().token
            const userId = props.userId
            remove(userId,token)
            .then(data => {
                if(data.error){
                    console.log(data.error)
                }
                else{
                    signout(() =>{
                    console.log("account deleted")
                    })
                    setRedirect(true)
                }
            })
        }

   const deleteConfirm = () =>{
        let answer = window.confirm("Are you sure you want to delete your account?")
        if(answer){
            deleteAccount()
        }
    }
    if(redirect){
        return <Redirect to="/" />
     }
    return(

        <button onClick={deleteConfirm} className="btn btn-raised btn-danger">Delete Profile</button>
    )
}