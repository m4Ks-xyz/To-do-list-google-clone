import { Task } from './tasks.model';

export interface ToDoList {
	listId: string;
	listTitle: string;
	tasks: Task[];
}
