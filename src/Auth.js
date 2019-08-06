import React, {useState} from 'react'
import { Link } from "react-router-dom";

function Auth() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const singIn = () => {
      return {
          pathname: !username || !password ? '/' : '/todos',
      }
    };

    return (
        <div>
            <div>
                <input type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter the username"/>
            </div>
            <div>
                <input type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter the password"/>
            </div>
            <div>
                <button>
                    <Link to={singIn()}>Sing in</Link>
                </button>
            </div>
        </div>
    )
}

export default Auth;
