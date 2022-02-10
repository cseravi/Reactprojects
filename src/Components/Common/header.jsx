import React, { PureComponent } from 'react'
import { Outlet } from 'react-router-dom';
import Menu from './Menu';

class Header extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
            <>
                <header>
                    <Menu user={this.props.user}/>
                </header>
            </>
        )
    }
}

export default Header