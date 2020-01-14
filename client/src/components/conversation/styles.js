import styled from "styled-components";

export const ModalContainer = styled('div')`
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(227, 237, 251, 0.5);
    padding-top: 60px;
`;

export const Modal = styled('div')`
    background-color: #fefefe;
    border: 1px solid #4F5051;
    margin: 3% auto 15% auto;
    min-width: 300px
    width: 450px;
    box-shadow: 10px 10px #888888;
    padding: 20px;
    @media only screen and (max-width: 425px) {
        width : 350px
    }
`;

export const InputDiv = styled('div')`
    border-radius: 5px;
    border: 1px solid red;
`;