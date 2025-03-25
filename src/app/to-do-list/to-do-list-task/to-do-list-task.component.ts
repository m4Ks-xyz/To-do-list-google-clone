import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
	input,
	output,
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
	}

	toggleComplete(listId: string, task: Task): void {
		this.editTask.emit({
			listId: listId,
			updatedTask: { ...task, complete: !task.complete },
		});
	}
}
