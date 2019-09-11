import React from 'react';
import styled from 'styled-components';

import Modal, { Props } from './Modal';

const ScrollArea = styled.div``;

interface SaveModalProps extends Props {}

const SaveModal: React.FC<SaveModalProps> = (props) => (
  <Modal {...props}>
    <h4> Save sketch </h4>
    <ScrollArea>
      <div className="button long blue"> Untitled Sketch 1 </div>
    </ScrollArea>
    <input type="text" placeholder="Untitled Project"></input>
  </Modal>
);

export default SaveModal;
