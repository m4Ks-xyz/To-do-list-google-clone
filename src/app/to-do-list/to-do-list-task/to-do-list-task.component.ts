import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
	input,
	output,
	signal,
} from '@angular/core';
import { Task } from '../to-do-list/models/task.model';
import { DatePipe } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { TaskFormDialogService } from '../dialogs/services/TaskFormDialog.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-to-do-list-task',
	imports: [
		DatePipe,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatRadioModule,
		MatMenuModule,
	],
	templateUrl: './to-do-list-task.component.html',
	styleUrl: './to-do-list-task.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListTaskComponent {
	readonly #destroyRef = inject(DestroyRef);
	readonly #taskFormDialogService = inject(TaskFormDialogService);

	readonly task = input.required<Task>();
	readonly listId = input.required<string>();

	readonly editTask = output<{
		listId: string;
		updatedTask: Task;
	}>();
	readonly removeTask = output<{ listId: string; taskId: string }>();

	readonly date = signal<Date>(new Date());

	openDialogEditTask(listId: string, taskData: Task): void {
		this.#taskFormDialogService
			.openEditTaskDialog(taskData)
			.then((dialogRef) => {
				dialogRef
					.afterClosed()
					.pipe(takeUntilDestroyed(this.#destroyRef))
					.subscribe((data) => {
						if (data) {
							this.editTask.emit({
								listId: listId,
								updatedTask: { ...data },
							});
						}
					});
			});
	}

	toggleFavorite(listId: string, task: Task): void {
		this.editTask.emit({
			listId: listId,
			updatedTask: { ...task, favorite: !task.favorite },
		});
		const taskDate = new Date(task.date);
		console.log('DATA ' + taskDate.toUTCString());
		const differenceMs = taskDate.valueOf() - this.date().valueOf();

		const differenceSeconds = Math.floor(differenceMs / 1000);
		const differenceMinutes = Math.floor(differenceMs / (1000 * 60));
		const differenceHours = Math.floor(differenceMs / (1000 * 60 * 60));
		const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

		console.log(
			`Difference: ${differenceDays} days, ${differenceHours % 24} hours, ${differenceMinutes % 60} minutes, ${differenceSeconds % 60} seconds`,
		);
	}

	toggleComplete(listId: string, task: Task): void {
		this.editTask.emit({
			listId: listId,
			updatedTask: { ...task, complete: !task.complete },
		});
	}
}
