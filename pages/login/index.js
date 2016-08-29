/* ===== ./src/views/Main/Login/Login.js ===== */
import React, { PropTypes as T } from 'react'
import AuthService from '../../core/AuthService'

export class Login extends React.Component {
    static propTypes = {
        location: T.object,
        auth: T.instanceOf(AuthService)
    }

    render() {
        const { auth } = this.props
        return (
            <div>
                <h2>Login</h2>
                    <button bsStyle="primary" onClick={auth.login.bind(this)}>Login</button>
            </div>
        )
    }
}

export default Login;