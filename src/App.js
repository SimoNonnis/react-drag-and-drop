import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { remove, insert } from 'ramda';

import { Column } from 'components';
import initialData from 'initial-data';

const Container = styled.div`
  height: 100vh;
  background-color: #fff8f1;
  display: flex;
  color: #62626d;
`;

export default class App extends Component {
  state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (
      destination === null ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    } else {
      const { columns } = this.state;
      const column = columns[source.droppableId];

      // Take the draggable item outside array
      const task = remove(source.index, 1, column.taskIDs);
      // Insert it in his destination position - use ramda insert
      const taskList = insert(destination.index, draggableId, task);
      console.log({ result });
      console.log(task);
      console.log(taskList);
    }
  };

  render() {
    const { columnOrder, columns, tasks } = this.state;

    return (
      <Container>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {columnOrder.map(columnId => {
            const column = columns[columnId];
            const taskList = column.taskIDs.map(taskId => tasks[taskId]);

            return <Column key={column.id} column={column} tasks={taskList} />;
          })}
        </DragDropContext>
      </Container>
    );
  }
}
