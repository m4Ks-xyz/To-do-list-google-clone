import { ToDoList } from '../../to-do-list/models/to-do-list.model';

export interface ListFormDialogData {
	list?: ToDoList;
	mode: 'edit' | 'add';
}

export type ListFormDialogResult = ToDoList | undefined;
