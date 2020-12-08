import React,{useEffect} from "react";
import {list} from "./Userapi";
import profileImg from "../images/icon.jpeg";
import {Link} from "react-router-dom"

export default function Users() {

    const [users,setUsers] = React.useState([])

    useEffect(() =>{
        list().then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setUsers(data)
            }
        })
    },[])

    const renderUsers = (users) =>(
        <div className="row">
            <div className="card-deck">
        {users.map((user,i) =>(
        <div className="card col-md-4 col-xs-12" style={{width:'40vw',textAlign:'left'}} key={i}>
        <img className="card-img-top" src={profileImg}style={{width:'35%',height:'auto',objectFit:'cover',position:'absolute',left:'60%',marginTop:'11px'}} alt={user.name} />
        <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">{user.email}</p>
          <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary btn-small">View Profile</Link>
        </div>
      </div>
        ))}
        </div>
       </div>
     )

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Users</h2>
             {renderUsers(users)}
        </div>
    )
}
