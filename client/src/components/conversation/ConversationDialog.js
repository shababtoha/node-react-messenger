import React, { useState, useEffect, useContext } from "react";
import { withApollo } from "react-apollo";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import {
  GET_USERS_QUERY,
  CHECK_EXISTING_CONVERSATION_QUERY
} from "./queries";
import UserContext from "../../contexts/UserContext";
import history from '../../history';
import { useDebounce } from "../../hooks/useDebounce";

const ConversationDialog = props => {
  const [titleText, setTitleText] = useState("");
  const [participantText, setParticipantText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState(false);
  const user = useContext(UserContext);
  const debouncedText = useDebounce(participantText, 500);

  useEffect(() => {
    if (!debouncedText) {
      setFilteredUsers([]);
      return;
    }
    props.client
      .query({
        query: GET_USERS_QUERY,
        variables: {
          username: debouncedText
        }
      })
      .then(data => {
        setFilteredUsers(data.data.users);
      })
      .catch(err => {
        console.log(err);
      });
  }, [debouncedText]);

  const updateParticipants = values => {
    if (values.length) setError(false);
    setParticipants(values);
  };

  const createConversation = userIds => {
    let title = titleText;
    if (!title) {
      title += user.username + ", ";
      title += participants.map(item => item.username).join(", ");
    }
    props.addConversation(title, userIds);
    props.onClose();
  };

  const checkExistingConversations = () => {
    if (!participants || !participants.length) {
      setError(true);
      return;
    }
    const userIds = participants.map(item => item.id);
    props.client
      .query({
        query: CHECK_EXISTING_CONVERSATION_QUERY,
        variables: { userIds }
      })
      .then(data => {
        const conversationId = data.data.checkExistingConversation;
        if (conversationId) {
          props.onClose();
          history.push(`/message/${conversationId}`);
        } else {
          createConversation(userIds);
        }
      })
      .catch(error => {
        console.log(error);
        props.onClose();
      });
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="-dialog-title"
    >
      <DialogTitle id="dialog-title">Start New Conversation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To start a new conversation, add who you want to chat with in the
          Participant list, give your conversation a title and start chatting!
        </DialogContentText>
        <TextField
          fullWidth
          label={"Conversation Title"}
          margin="dense"
          onChange={e => setTitleText(e.target.value)}
          value={titleText}
        />
        <Autocomplete
          multiple
          onChange={(event, values) => updateParticipants(values)}
          options={filteredUsers}
          getOptionLabel={option => option.username}
          renderInput={params => (
            <TextField
              {...params}
              fullWidth
              label={"Participants"}
              margin="dense"
              onChange={e => setParticipantText(e.target.value)}
              value={participantText}
              error={error}
              helperText={error ? "Participants cannot be empty" : ""}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={checkExistingConversations} color="primary">
          Start Conversation
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withApollo(ConversationDialog);
