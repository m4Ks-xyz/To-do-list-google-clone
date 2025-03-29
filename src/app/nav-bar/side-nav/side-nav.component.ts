import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
	input,
	output,
	signal,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { generateRandomId } from '../../utils/generate-random-id.util';
import { ToDoList } from '../../to-do-list/to-do-list/models/to-do-list.model';
import { ListFormDialogService } from '../../to-do-list/dialogs/services/ListFormDialog.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskFormDialogService } from '../../to-do-list/dialogs/services/TaskFormDialog.service';
import { Task } from '../../to-do-list/to-do-list/models/task.model';

@Component({
	selector: 'app-side-nav',
	imports: [
		MatSidenavModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatCardModule,
		MatCheckboxModule,
		MatRadioModule,
		MatDialogModule,
	],
	templateUrl: './side-nav.component.html',
	styleUrl: './side-nav.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {
	readonly #destroyRef = inject(DestroyRef);

	readonly #listFormDialogService = inject(ListFormDialogService);
	readonly #taskFormDialogService = inject(TaskFormDialogService);

	readonly sidenavIsOpen = input<boolean>(true);
	readonly myLists = input.required<ToDoList[]>();
	readonly filterFavoriteActive = input.required<boolean>();

	readonly newList = output<{ id: string; title: string; default: boolean }>();
	readonly toggleListVisibility = output<string>();
	readonly toggleFavoriteShow = output<boolean>();
	readonly newDefaultListTask = output<{ listId: string; task: Task }>();

	showFiller = signal<boolean>(true);

	openDialogAddList(): void {
		this.#listFormDialogService.openAddListDialog().then((dialogRef) => {
			dialogRef
				.afterClosed()
				.pipe(takeUntilDestroyed(this.#destroyRef))
				.subscribe((data) => {
					if (data) {
						this.newList.emit({
							...data,
							id: generateRandomId(),
						});
					}
				});
		});
	}

	openDialogNewTaskDefaultList(): void {
		this.#taskFormDialogService.openAddTaskDialog().then((dialogRef) => {
			dialogRef
				.afterClosed()
				.pipe(takeUntilDestroyed(this.#destroyRef))
				.subscribe((data) => {
					if (data) {
						this.newDefaultListTask.emit({
							listId: 'default',
							task: { ...data, id: generateRandomId() },
						});
					}
				});
		});
	}
}
