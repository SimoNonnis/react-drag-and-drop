import React, { PureComponent } from 'react';
import { Column } from 'components';

export class ColumnList extends PureComponent {
  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIDs.map(taskID => taskMap[taskID]);

    return <Column column={column} tasks={tasks} index={index} />;
  }
}
