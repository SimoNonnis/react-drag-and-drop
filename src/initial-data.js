const TASK1 = 'task1';
const TASK2 = 'task2';
const TASK3 = 'task3';
const TASK4 = 'task4';

const COLUMN1 = 'column1';

const initialData = {
  tasks: {
    [TASK1]: { id: TASK1, content: 'Buy usb storage' },
    [TASK2]: { id: TASK2, content: 'Buy baba yagas print' },
    [TASK3]: { id: TASK3, content: 'Call from Tom' },
    [TASK4]: { id: TASK4, content: 'Buy bread' }
  },
  columns: {
    [COLUMN1]: {
      id: COLUMN1,
      title: 'To Do',
      taskIDs: [TASK1, TASK2, TASK3, TASK4]
    }
  },
  columnOrder: [COLUMN1]
};

export default initialData;
