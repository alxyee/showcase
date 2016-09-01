import React, {PropTypes as T} from 'react'
import {Button} from 'react-bootstrap'
import AuthService from '../../../core/AuthService'
import ProfileDetails from '../../../components/Profile/ProfileDetails'
import ProfileEdit from '../../../components/Profile/ProfileEdit'
import styles from './styles.module.css'

import history from '../../../core/history';

export class Home extends React.Component {
    static contextTypes = {
        router: T.object
    }

    static propTypes = {
        auth: T.instanceOf(AuthService)
    }

    constructor(props, context) {
        super(props, context)
        console.log(props)
        this.state = {
            profile: props.route.auth.getProfile()
        }
        props.route.auth.on('profile_updated', (newProfile) => {
            this.setState({profile: newProfile})
        })
    }

    logout() {
        this.props.route.auth.logout()
        history.push({pathname: '/login'})
    }

    render() {
        const {profile} = this.state
        return (
            <div className={styles.root}>
                <h2>Home</h2>
                <ProfileDetails profile={profile}></ProfileDetails>
                <ProfileEdit profile={profile} auth={this.props.route.auth}></ProfileEdit>
                <Button onClick={this.logout.bind(this)}>Logout</Button>
            </div>
        )
    }
}

export default Home;
