import React, { useEffect } from "react";
import { isAuthenticated } from "../auth/index";
import { Redirect, Link } from "react-router-dom";
import { read } from "./Userapi";
import profileImg from "../images/icon.jpeg";
import DeleteUser from "./DeleteUser"

export default function Profile(props) {

    const [User, setUser] = React.useState("");
    const [redirect, setRedirect] = React.useState(false);


    const init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then(data => {
                if (data.error) {
                    setRedirect(true);
                } else {
                    setUser(data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        const userId = props.match.params.userId;
        init(userId);
    },[])

    if (redirect) {
        return <Redirect to="/signin"></Redirect>
    }

    return (

        <div className="container">
             <div className="lead mt-5" style={{fontSize:"30px"}}>Profile</div>
            <div className="row">
                <div className="col-md-6">
                    <img className="card-img-top mt-5" src={profileImg}style={{width:'35%',height:'auto',objectFit:'cover',padding:'10px'}} alt={User.name} />
                   
                </div>
                <div className="col-md-6">
                    <div className="lead mt-2">
                    <p>Hello {User.name} !</p>
                    <p>Email: {User.email}</p>
                    <p>{`Joined: ${new Date(User.created).toDateString()}`}</p>
                    </div>
                    {isAuthenticated().user &&
                        isAuthenticated().user._id === User._id && (
                            <div className="d-inline-block mt-5">
                                <Link
                                    className="btn btn-raised btn-success mr-5"
                                    to={`/user/edit/${User._id}`}>Edit Profile</Link>
                                    
                               <DeleteUser userId={User._id}/>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}