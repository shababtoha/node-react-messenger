import styled from "styled-components";

export const LoginModal = styled('div')`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4); 
    padding-top: 60px;
`;

export const LoginForm = styled('div')`
    background-color: #fefefe;
    margin: 3% auto 15% auto;
    min-width: 300px
    width: 450px;
    box-shadow: 10px 10px #888888;
    padding: 20px;
    @media only screen and (max-width: 425px) {
        width : 350px
    }
`;

export const Button = styled('button')`
    margin-top: 10px;
    border-radius: 5px;
    height: 40px;
    width: 100%;
    text-align: center;
    background-color: #4895F7;
    color: white;
    font-weight: bold;
`;