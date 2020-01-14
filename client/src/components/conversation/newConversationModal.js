import React from 'react';
import { ModalContainer, Modal, InputDiv } from './styles';



const newConversationModal = (props) => {
    return (
        <ModalContainer>
            <Modal>
                <h2 style={{ width: '100%', textAlign: 'center' }} > New Conversation</h2>
                <InputDiv contentEditable="true">
                    <span contentEditable="false" style={{background: 'blue'}}> shabab</span>
                    <span contentEditable="false" style={{background: 'blue'}}> shababbbbb</span>
                    <span contentEditable="false" style={{background: 'blue'}}> shabaaaaab</span>
                </InputDiv>
            </Modal>
        </ModalContainer>
    )
};

export default newConversationModal;