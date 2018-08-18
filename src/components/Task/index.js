import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  transition: background-color 0.2s ease;
  background-color: ${({ isDragging }) => (isDragging ? '#dde9f3' : '#d9d9f8')};

  & + & {
    margin-top: 0.5em;
  }
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 0.5em;
  background-color: coral;
  transition: background-color 0.2s ease;

  &:focus {
    outline: none;
    background-color: #6495ed;
  }
`;

export class Task extends Component {
  render() {
    const { content, id } = this.props.task;
    const { index } = this.props;

    return (
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <Container
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            isDragging={snapshot.isDragging}
          >
            <Handle {...provided.dragHandleProps} />
            {content}
          </Container>
        )}
      </Draggable>
    );
  }
}
