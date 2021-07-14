import React from 'react';

const Nav = () => {
    return (
        <div className='nav'>
            <a className='nav-brand' href='/'>
                {/* <img className='brand-img' src='img/fv-logo.png'  alt='Senior Activity Games Logo'/> */}
            </a>
            
            <ul className='link-container'>
                <a className='nav-link' href='/'><li>Home</li></a>
                <a className='nav-link' href='#games'><li>Games</li></a>
            </ul>
        </div>
    );
}

export default Nav;