import React, {PropTypes as T} from 'react'
import {Button} from 'react-bootstrap'
import AuthService from '../../../core/AuthService'
import ProfileDetails from '../../../components/Profile/ProfileDetails'
import ProfileEdit from '../../../components/Profile/ProfileEdit'
import styles from './styles.module.css'
import {connect} from 'react-redux'
import axios from 'axios'

import history from '../../../core/history';

export class HomeView extends React.Component {
    static contextTypes = {
        router: T.object
    }

    static propTypes = {
        auth: T.instanceOf(AuthService)
    }

    componentWillMount() {

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
        console.log(profile)
        return (
            <div className={styles.root}>
                <h2>Home</h2>
                <Button onClick={()=>{this.props.handleBoxCheck()}}>BOX BUTTON</Button>
                <ProfileDetails profile={profile}></ProfileDetails>
                <ProfileEdit profile={profile} auth={this.props.route.auth}></ProfileEdit>
                <Button onClick={this.logout.bind(this)}>Logout</Button>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleBoxCheck: () => {

        }
    }
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeView)

export default Home;
