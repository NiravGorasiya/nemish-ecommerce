import React, { ChangeEvent, useState } from 'react'
import { useLoginMutation } from '../redux/slice/autheSlice'
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user:any = await login(userData);
            console.log(user, 'user');
            localStorage.setItem('authToken', user?.data?.token);
            navigate("/dashboard")
        } catch (error) {

        }
    }
    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
       
    }

    return (
        <div className="d-flex vh-100 align-items-center justify-content-center">
            <div className="card card-login w-50">
                <div className="card-body">
                    <h4 className="card-title mb-4 text-center">Sign in</h4>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <input className="form-control" placeholder="Username or email" name="email" onChange={handleInputChange} type="text" />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" placeholder="Password" name="password" onChange={handleInputChange} type="password" />
                        </div>
                        <div className="mb-4">
                            <button type="submit" className="btn btn-primary w-100"> Login </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login