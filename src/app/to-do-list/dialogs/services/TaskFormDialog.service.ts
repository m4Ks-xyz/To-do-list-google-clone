import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../models/task.model';
import { TaskFormDialogComponent } from '../task-form/task-form.component';
import {
	TaskFormDialogData,
	TaskFormDialogResult,
} from '../models/task-form-dialog.model';

@Injectable({
	providedIn: 'root',
})
export class TaskFormDialogService {
	readonly #dialog = inject(MatDialog);

	async openAddTaskDialog(task?: Task) {
		const dialogCmp = await import('../task-form/task-form.component').then(
			(m) => m.TaskFormDialogComponent,
		);

		return this.#dialog.open<
			TaskFormDialogComponent,
			TaskFormDialogData,
			TaskFormDialogResult
		>(dialogCmp, {
			data: {
				task,
				mode: 'add',
			},
		});
	}

	async openEditTaskDialog(task: Task) {
		const dialogCmp = await import('../task-form/task-form.component').then(
			(m) => m.TaskFormDialogComponent,
		);

		return this.#dialog.open<
			TaskFormDialogComponent,
			TaskFormDialogData,
			TaskFormDialogResult
		>(dialogCmp, {
			data: {
				task,
				mode: 'edit',
			},
		});
	}
}
