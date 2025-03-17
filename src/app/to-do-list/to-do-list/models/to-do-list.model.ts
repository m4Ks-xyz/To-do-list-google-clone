import { Task } from './tasks.model';

export interface ToDoList {
	id: string;
	title: string;
	tasks: Task[];
}
