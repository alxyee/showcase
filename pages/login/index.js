import React, {PropTypes as T} from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from '../../core/AuthService'
import styles from './styles.module.css'

import axios from 'axios'

export class Login extends React.Component {
    static contextTypes = {
        router: T.object
    }

    static propTypes = {
        location: T.object,
        auth: T.instanceOf(AuthService)
    }

    handleClick() {
        const access_token = "enLxZvbEgKdnAijog5pIr1DXc670mBgN"
        axios({
            method: 'post',
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            url: 'https://api.box.com/2.0/users/330505214',
            data: {"name": "Ned Stark", "is_platform_access_only": true}
        }).then(response=> {
            console.log(response)
        })
    }

    render() {
        const {auth} = this.props.route
        return (
            <div className={styles.root}>
                Login Page
                <h2>Login</h2>
                <ButtonToolbar className={styles.toolbar}>
                    <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>

                    <Button onClick={()=>{this.handleClick()}}>TestStuff</Button>
                </ButtonToolbar>
            </div>
        )
    }
}

export default Login;

