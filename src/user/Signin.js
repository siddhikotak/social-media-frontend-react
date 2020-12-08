import React from "react";
import { Redirect } from "react-router-dom";

function Signin() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [redirect, setRedirect] = React.useState(false);
    const [loading, setLoading] = React.useState(false)


    const authenticate = (jwt, next) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(jwt));
            next();
        }
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const user = { email, password };
        signin(user)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setLoading(false)
                }
                else {
                    authenticate(data, () => {
                        setRedirect(true);
                    })
                }
            })
    };

    const signin = (user) => {
        return fetch("http://localhost:5000/signin", {
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

    if (redirect) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <div className="container">
                <h2 className="mt-5 mb-5">SignIn</h2>

                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                {loading ? (<div className="jumbotron text-center">
                    <h1>Loading...</h1>
                </div>) : ""}

                <form>

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

export default Signin;