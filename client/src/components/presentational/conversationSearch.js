import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled('div')`
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

const Search = styled('input')`
    background: #f4f4f8;
    padding: 8px 10px;
    border-radius: 10px;
    border: none;
    font-size: 14px;
    outline : none;
    :: placeholder {
        text-align: center;
    }
    
    :focus::placeholder {
        text-align: left;
    }
`;

const conversationSearch = (props) => {
    return (
        <SearchContainer>
            <Search type="text"  placeholder="Search Messages" />
        </SearchContainer>
    )
};

export default  conversationSearch;