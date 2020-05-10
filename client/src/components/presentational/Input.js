import React from 'react';
import styled from 'styled-components';

const InputDiv = styled('div')`
    margin-top: 2px;
    width: 98%;
    display: table;
`;

const InputElement = styled('input')`
    height: 25px;
    width: 100%;
    padding-left: 5px;
    display: table-cell;
    border-radius: 5px;
    border: 1px solid ${props  => props.error? "red" :  "#ddd " };
`;

const Input = (props) => {
    return (
        <InputDiv>
            <label  style={{
                display: "block",
                padding: "10px 0px"
            }}> {props.label} </label>
            <InputElement
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
                error={props.error}
            />
            <span style={{color: 'red', fontSize:15}}> {props.error} </span>
        </InputDiv>
    );
};

export default Input;