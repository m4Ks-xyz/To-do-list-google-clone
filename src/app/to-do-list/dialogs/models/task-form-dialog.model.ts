import { Task } from '../../to-do-list/models/task.model';

export interface TaskFormDialogData {
	task?: Task;
	mode: 'edit' | 'add';
}

export type TaskFormDialogResult = Task | undefined;
