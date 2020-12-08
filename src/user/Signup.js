import React from "react";
import {Link} from "react-router-dom";


function Signup() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [open, setOpen] = React.useState(false);


    const clickSubmit = (event) => {
        event.preventDefault();
        const user = { name, email, password };
        signup(user)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                }
                else {
                    clearState();
                }
            })
    };

    const clearState = () => {
        setName('')
        setEmail('')
        setPassword('')
        setError('')
        setOpen(true)
    }

    const signup = (user) => {
        return fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                return response.json()
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <div className="container">
                <h2 className="mt-5 mb-5">SignUp</h2>

                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                    New account is successfully created. Please{" "} <Link to="/signin">Sign In</Link> !!
                </div>

                <form>
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
                    <button onClick={clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;