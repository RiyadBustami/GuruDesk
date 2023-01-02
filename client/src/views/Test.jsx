import { React, useState, useEffect } from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Test = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/loggedin', { withCredentials: true })
            .then(res => setUser(res.data.user))
            .catch(err => console.log(err));
    }, []);
    const handleButton = e => {
        e.preventDefault();
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => {console.log(res); navigate("/login")})
            .catch(err => console.log(err));
    }
    return (
        <div>
            <h1>welcome, {user.firstName}</h1>
            <button onClick={handleButton}>Log out</button>
        </div>
    )
}

export default Test