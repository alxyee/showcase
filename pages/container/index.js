/* ===== ./src/views/Main/Container.js ===== */
import React, { PropTypes as T } from 'react'

export class Container extends React.Component {
    render() {
        let children = null;
        if (this.props.children) {
            children = React.cloneElement(this.props.children, {
                auth: this.props.route.auth //sends auth instance from route to children
            })
        }

        return (
            <div>
                <h2>
                    <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
                </h2>
                {children}
            </div>
        )
    }
}

export default Container;