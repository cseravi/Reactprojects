import React from 'react';
import { Link } from 'react-router-dom';


function Menu(props) {
    // console.log(props)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-lg">
                    <h6><Link className="navbar-brand" to="/dashboard">TaskSystem</Link></h6>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="#">Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='d-flex'>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/profile">Hi {props.user.name}!</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Menu
