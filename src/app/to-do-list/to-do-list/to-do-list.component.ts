import {
	ChangeDetectionStrategy,
	Component,
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
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../../new/new-task/new-task.component';
import { Task } from './models/tasks.model';
import { generateRandomId } from '../../utils/generate-random-id.util';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-to-do-list',
	imports: [
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatRadioModule,
		MatMenuModule,
		DatePipe,
	],
	templateUrl: './to-do-list.component.html',
	styleUrl: './to-do-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent {
	readonly #dialog = inject(MatDialog);
	readonly toDoLists = input.required<ToDoList[]>();
	readonly removeList = output<string>();
	readonly removeTask = output<{ listId: string; taskId: string }>();
	readonly newTask = output<{
		listId: string;
		task: Task;
	}>();

	onRemoveList(id: string): void {
		this.removeList.emit(id);
	}

	onRemoveTask(listId: string, taskId: string): void {
		this.removeTask.emit({ listId, taskId });
	}

	openDialog(listId: string): void {
		const openDialog = this.#dialog.open(NewTaskComponent);

		openDialog.afterClosed().subscribe((data) => {
			if (data) {
				const randomId = generateRandomId();
				this.newTask.emit({ listId: listId, task: { id: randomId, ...data } });
			}
		});
	}
}
