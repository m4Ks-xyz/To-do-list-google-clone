import { Task } from './task.model';

export interface ToDoList {
	id: string;
	title: string;
	show: boolean;
	tasks: Task[];
}
