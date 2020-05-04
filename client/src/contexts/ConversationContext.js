import React, { useState, createContext } from "react";

const ConversationContext = createContext({
    id: null,
    title: null,
});

const ConversationProvider = (props) => {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState(null);

    return (
        <ConversationContext.Provider
            value={{
                id,
                setId,
                title,
                setTitle,
            }}
        >
            {props.children}
        </ConversationContext.Provider>
    );
};

export { ConversationContext, ConversationProvider };
