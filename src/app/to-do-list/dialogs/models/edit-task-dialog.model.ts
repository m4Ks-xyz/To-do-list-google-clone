import { Task } from '../../to-do-list/models/task.model';

export interface EditTaskDialogData {
	task: Task;
	mode: 'edit' | 'add';
}

export type EditTaskDialogResult = Task | undefined;
