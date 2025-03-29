import { Task } from './task.model';

export interface ToDoList {
	id: string;
	title: string;
	show: boolean;
	default: boolean;
	tasks: Task[];
}
