import React, { useEffect, useRef, useState } from 'react';
import './AdminNavbar.css';
import MenuIcon from '@mui/icons-material/Menu';

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { useNavigate } from 'react-router-dom';

function AdminNavbar({ toggleSidebar }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null); // Create a ref for the dropdown element
    const [tokenAdmin, setToken] = React.useState('');
    const navigate = useNavigate();

    // Create a ref for the menu bar button
    const menuBarButtonRef = useRef(null);

    // Add a click event listener to the document inside a useEffect hook
    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Check if the click target is not the dropdown or a child of the dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Click occurred outside the dropdown, so close it
                setOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [dropdownRef]);

    useEffect(() => {
        const cookies = document.cookie.split(';');

        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');

            if (name === 'tokenAdmin') {
                // Check for the "token" cookie
                setToken(decodeURIComponent(value));
                break;
            }
        }
    }, []);

    function adminLogout() {
      console.log("Logout button clicked");
        const pastExpirationDate = new Date(0).toUTCString(); // A date in the past
        document.cookie = `tokenAdmin=; expires=${pastExpirationDate}; path=/`;

        setToken('');

        setInterval(() => {
            navigate('/');
        }, 1000);
    }

    return (
        <div className='admin-navbar-right'>
            <button ref={menuBarButtonRef} onClick={toggleSidebar} className='admin-navbar-menubar'>
                <MenuIcon />
            </button>
            <div className="admin-navbar-container">
                <h3>Cospace</h3>
            </div>
            <button ref={dropdownRef} onClick={() => setOpen(!open)} className='admin-navbar-avatar'>
                <AccountCircleSharpIcon className='ava' />
            </button>

            <div className={`dropdown-menu ${open ? 'acitive' : 'inactive'}`}>
                <ul>
                    <DropdownItem text='ChangePassword' />
                    <DropdownItem onClick={() => {
    adminLogout()
}} text='Logout' />
                </ul>
            </div>
        </div>
    );
}

function DropdownItem(props) {
    return (
        <li className='dropdownItem' onClick={props.onClick} >
            <a> {props.text} </a>
        </li>
    );
}

export default AdminNavbar;
