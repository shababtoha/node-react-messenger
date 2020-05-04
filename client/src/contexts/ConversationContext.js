import React, { useState, createContext } from "react";
import history from "../history";

const ConversationContext = createContext({
    id: null,
    title: null,
});

const ConversationProvider = (props) => {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState(null);

    const setConversation = (newId, newTitle) => {
        setId(newId);
        setTitle(newTitle);
    };

    const changeConversation = (newId, newTitle) => {
        setConversation(newId, newTitle);
        history.push(`/message/${newId}`);
    };

    return (
        <ConversationContext.Provider
            value={{
                id,
                title,
                setConversation,
                changeConversation,
            }}
        >
            {props.children}
        </ConversationContext.Provider>
    );
};

export { ConversationContext, ConversationProvider };
