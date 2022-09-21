import {client} from '../lib/network';
import { LoginMutation } from '../lib/graphQueries';
import { errorHandler } from '../lib/errorHandler';
import { useNavigate } from 'react-router-dom';




const Login=(props)=>{
    const navigate=useNavigate();

    const submit=async (e,data)=>{
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        await client.mutate({
            mutation:LoginMutation,
            variables:{
                email,
                password
            }
        }).then(res=>{
            localStorage.setItem('access',res.data.loginUser.access);
            localStorage.setItem('refresh',res.data.loginUser.refresh);
            navigate('/');
        }).catch(e=>{
            console.log(errorHandler(e));
        })
    }



    return <div>
        <h1>Login</h1>
        <form onSubmit={submit}>
            <input type="email" placeholder="Email" name="email"/>
            <input type="password" placeholder="Password" name="password"/>
            <button type="submit">Login</button>
        </form>
    </div>
}

export default Login