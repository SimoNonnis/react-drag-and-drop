import React, { Component } from 'react';

import { Column } from 'components';
import initialData from 'initial-data';

export default class App extends Component {
  state = initialData;

  render() {
    const { columnOrder, columns, tasks } = this.state;

    return columnOrder.map(columnId => {
      const column = columns[columnId];
      const taskList = column.taskIDs.map(taskId => tasks[taskId]);

      return <Column key={column.id} column={column} tasks={taskList} />;
    });
  }
}
