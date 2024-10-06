
import { useState } from "react";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom"; 
import { logout } from "../actions/auth";
import { connect } from "react-redux";

function Nav({logout}) {
    const [isOpen, setIsOpen] = useState(false);  
    const Navigate = useNavigate()
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const logoutuser = () =>{
        logout();
        Navigate("/")
    }

    return (
        <NavBar>
            <div className='logo'>
                <img src="images/ACM logo.png" alt="logo" />
                <p>CareNexus</p>
            </div>
            <Hamburger onClick={toggleMenu}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </Hamburger>
            <Menu isOpen={isOpen}>
                <Link className='ListItem' to="/home">Home</Link>
                <Link className='ListItem' to="#about">About</Link>
                <Link className='ListItem' to="#footer">Contact</Link>
            </Menu>
            <button onClick={logoutuser}>Log Out</button>
        </NavBar>
    );
}

export default connect(null, { logout })(Nav);


const NavBar = styled.div`
    margin-top: 0px;
    padding-top: 5px;
    padding-left: 20px;
    padding-right: 50px;
    display: flex;
    justify-content: space-around; 
    align-items: center;
    position: fixed;
    background-color: white;
    width: 100%;
    z-index: 100;
    
    .logo img {
        height: 65px;
    }
    p{
        font-size: 12px;
        /* transform: translateX(-60px); */
    }
    button {
        height: 32px;
        margin: 15px;
        width: 80px;
        background-color: #3186b2;
        border-radius: 2px;
        border: none;
        font-weight: 550;
        color: #fcfcfc;
        &:hover {
            background-color: #fcfcfc;
            color: #3186b2;
            border: 1px solid black;
            transition: ease-in 0.3s;
            cursor: pointer;
        }
    }

    @media (max-width: 600px) {
        justify-content: space-around; 
    }
`;

const Menu = styled.ul`
    display: flex;
    gap: 20px;
    list-style: none;

    .ListItem {
        text-decoration: none; 
        color :black ;
        font-size: 16px;
        border-radius: 4px;
        transition: background-color  0.3s ease, color 0.3s ease,transform 0.2s ease ;

        &:hover {
            color: #3186b2;
            cursor: pointer;
            transform: translateY(-3px);
        }
    }

    @media (max-width: 600px) {
        position: absolute;
        top: 70px;
        right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
        flex-direction: column;
        background-color: white;
        width: 200px;
        height: 100vh;
        transition: right 0.3s ease-in-out;
        padding: 2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 99;

        .ListItem {
            margin-bottom: 20px;
            font-size: 18px;
            color: #000;
            text-decoration: none;  
        }
    }
`;


const Hamburger = styled.div`
    display: none;
    font-size: 24px;
    cursor: pointer;

    @media (max-width: 600px) {
        display: block;
    }
`;

const LoginButton = styled.button`
    @media (max-width: 600px) {
        display: none;
    }
`;