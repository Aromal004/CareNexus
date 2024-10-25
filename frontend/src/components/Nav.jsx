import { useState } from "react";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll"; // Import from react-scroll
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

function Nav({ logout }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const logoutUser = () => {
        logout();
        navigate("/");
    };

    return (
        <NavBar>
            <LogoContainer>
                {/* <img src="images/ACM logo.png" alt="logo" /> */}
                <p>CareNexus</p>
            </LogoContainer>
            <Hamburger onClick={toggleMenu}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </Hamburger>
            <Menu isOpen={isOpen}>
                <StyledScrollLink
                    className="ListItem"
                    to="home"
                    smooth={true}
                    duration={500} // Smooth scroll duration
                    spy={true}
                    offset={-70} // Offset to account for fixed navbar
                >
                    Home
                </StyledScrollLink>
                <StyledScrollLink
                    className="ListItem"
                    to="about"
                    smooth={true}
                    duration={500}
                    spy={true}
                    offset={-70}
                >
                    About
                </StyledScrollLink>
                <StyledScrollLink
                    className="ListItem"
                    to="footer"
                    smooth={true}
                    duration={500}
                    spy={true}
                    offset={-70}
                >
                    Contact
                </StyledScrollLink>
            </Menu>
        </NavBar>
    );
}

export default connect(null, { logout })(Nav);

// Styled Components

const NavBar = styled.div`
    padding: 15px 30px 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    color: black;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow to lift the navbar */
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;

    img {
        height: 50px;
        margin-right: 10px;
    }

    p {
        font-size: 1.5rem;
        font-weight: bold;
        color: black;
        margin: 0;
    }
`;

const Hamburger = styled.div`
    font-size: 24px;
    color: black;
    cursor: pointer;
    display: none;

    @media (max-width: 768px) {
        display: block;
    }
`;

const Menu = styled.ul`
    display: flex;
    gap: 30px;
    list-style: none;
    margin: 0;
    transform: translateX(-80px);
    @media (max-width: 768px) {
        position: absolute;
        top: 60px;
        right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
        flex-direction: column;
        background-color: white;
        width: 200px;
        height: 100vh;
        padding: 2rem;
        transition: right 0.3s ease-in-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 99;
    }
`;

const StyledScrollLink = styled(ScrollLink)`
    color: black;
    font-size: 18px;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;

    &:hover {
        color: #3186b2;
        background-color: #fcfcfc;
        transform: translateY(-3px); /* Lifting effect on hover */
    }

    @media (max-width: 768px) {
        font-size: 20px;
        margin-bottom: 20px;
    }
`;
