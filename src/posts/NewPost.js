import React, { useEffect } from "react"
import { isAuthenticated } from "../auth/index";
import { read, update,updateUser } from "./Userapi"
import { Redirect } from "react-router-dom";

export default function EditProfile(props) {
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    // const [photo, setPhoto] = React.useState([]);
    const [redirect, setRedirect] = React.useState(false);

    const init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then(data => {
                if (data.error) {
                    setRedirect(true);
                } else {
                    setId(data._id);
                    setName(data.name);
                    setEmail(data.email);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const isValid = () => {
        if (name.length === 0) {
            setError("Name is required");
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError("A valid email is required");
            return false;
        }
        if (password.length >= 0 && password.length <= 5) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        return true;
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        if (isValid()) {
            const user = { id, name, email, password };
            const userId = props.match.params.userId;
            const token = isAuthenticated().token;
            update(userId, token, user)
                .then(data => {
                    if (data.error) {
                        setError(data.error);
                        console.log(data.error)
                    }
                    else {
                        updateUser(data.user, () => {
                            setRedirect(true);
                        })
                    }
                })
        }
    }


    useEffect(() => {
        const userId = props.match.params.userId;
        init(userId);
    }, [])



    if (redirect) {
        return <Redirect to={`/user/${id}`} />
    }

    return (
        <div className="container">
            <div className="lead mt-5 mb-5" style={{ fontSize: '30px' }}>Edit Profile</div>

            <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                {error}
            </div>

            <form>
            {/* <div className="form-group">
                    <label className="muted-text">Profile Photo</label>
                    <input onChange={(e) => setPhoto(e.target.files[0])} type="file" accept="image/*" className="form-control" />
                </div> */}
                <div className="form-group">
                    <label className="muted-text">Name</label>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="muted-text">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="muted-text">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" />
                </div>
                <button onClick={clickSubmit} className="btn btn-raised btn-primary">Update</button>
            </form>
        </div>
    )
}