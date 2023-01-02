import { React, useState, useEffect } from 'react'
import axios from 'axios';

const Test = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/loggedin', { withCredentials: true })
            .then((res) => {setUser(res.data.user)})
            .catch(err => console.log(err));
    }, []);
    return (
        <div>
            <h1>welcome, {user.firstName}</h1>
        </div>
    )
}

export default Test