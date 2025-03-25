import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
	input,
	output,
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { ToDoList } from './models/to-do-list.model';
import { Task } from './models/task.model';
import { generateRandomId } from '../../utils/generate-random-id.util';
import { ListFormDialogService } from '../dialogs/services/ListFormDialog.service';
import { TaskFormDialogService } from '../dialogs/services/TaskFormDialog.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToDoListTaskComponent } from '../to-do-list-task/to-do-list-task.component';

@Component({
	selector: 'app-to-do-list',
	imports: [
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatRadioModule,
		MatMenuModule,
		ToDoListTaskComponent,
	],
	templateUrl: './to-do-list.component.html',
	styleUrl: './to-do-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent {
	readonly #destroyRef = inject(DestroyRef);

	readonly #listFormDialogService = inject(ListFormDialogService);
	readonly #taskFormDialogService = inject(TaskFormDialogService);

	readonly toDoLists = input.required<ToDoList[]>();

	readonly removeList = output<string>();
	readonly removeTask = output<{ listId: string; taskId: string }>();

	readonly newTask = output<{
		listId: string;
		task: Task;
	}>();
	readonly editList = output<{ listId: string; updatedTitle: string }>();
	readonly editTask = output<{
		listId: string;
		updatedTask: Task;
	}>();

	openDialogNewTask(listId: string): void {
		this.#taskFormDialogService.openAddTaskDialog().then((dialogRef) => {
			dialogRef
				.afterClosed()
				.pipe(takeUntilDestroyed(this.#destroyRef))
				.subscribe((data) => {
					if (data) {
						this.newTask.emit({
							listId: listId,
							task: { ...data, id: generateRandomId() },
						});
					}
				});
		});
	}

	openEditListDialog(listData: ToDoList): void {
		this.#listFormDialogService
			.openEditListDialog(listData)
			.then((dialogRef) => {
				dialogRef
					.afterClosed()
					.pipe(takeUntilDestroyed(this.#destroyRef))
					.subscribe((data) => {
						if (data) {
							this.editList.emit({
								listId: listData.id,
								updatedTitle: data.title,
							});
						}
					});
			});
	}

	emitEditTaskData(taskData: { listId: string; updatedTask: Task }): void {
		this.editTask.emit(taskData);
	}

	emitRemoveTaskData(taskData: { listId: string; taskId: string }): void {
		this.removeTask.emit(taskData);
	}

	onRemoveList(id: string): void {
		this.removeList.emit(id);
	}
}
