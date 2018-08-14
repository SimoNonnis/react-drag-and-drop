import React, { Component } from 'react';
import styled from 'styled-components';

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

  render() {
    const { columnOrder, columns, tasks } = this.state;

    return (
      <Container>
        {columnOrder.map(columnId => {
          const column = columns[columnId];
          const taskList = column.taskIDs.map(taskId => tasks[taskId]);

          return <Column key={column.id} column={column} tasks={taskList} />;
        })}
      </Container>
    );
  }
}
