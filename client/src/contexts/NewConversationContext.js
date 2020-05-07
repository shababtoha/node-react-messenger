import React, { useState, createContext } from "react";
import history from "../history";

const NEW_CONVERSATION_TITLE_KEY = "messenger-new-title";
const NEW_CONVERSATION_USERS_KEY = "messenger-new-users";

const NewConversationContext = createContext({
    title: null,
    users: null,
});

const NewConversationProvider = (props) => {
    const [title, setTitle] = useState(
        localStorage.getItem(NEW_CONVERSATION_TITLE_KEY) || null
    );
    const [users, setUsers] = useState(
        localStorage.getItem(NEW_CONVERSATION_USERS_KEY) || null
    );

    const setNewConversation = (title, users) => {
        users = JSON.stringify(users);
        localStorage.setItem(NEW_CONVERSATION_TITLE_KEY, title);
        localStorage.setItem(NEW_CONVERSATION_USERS_KEY, users);
        setTitle(title);
        setUsers(users);
        history.push("/message/new");
    };

    const removeNewConversation = () => {
        localStorage.removeItem(NEW_CONVERSATION_TITLE_KEY);
        localStorage.removeItem(NEW_CONVERSATION_USERS_KEY);
        setTitle(null);
        setUsers(null);
    };

    return (
        <NewConversationContext.Provider
            value={{
                title,
                users,
                setNewConversation,
                removeNewConversation,
            }}
        >
            {props.children}
        </NewConversationContext.Provider>
    );
};

export { NewConversationContext, NewConversationProvider };
