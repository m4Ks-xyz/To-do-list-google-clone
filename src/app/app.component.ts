import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideNavComponent } from './nav-bar/side-nav/side-nav.component';
import { ToDoListComponent } from './to-do-list/to-do-list/to-do-list.component';
import { ToDoListService } from './to-do-list/to-do-list/services/to-do-list.service';
import { Task } from './to-do-list/to-do-list/models/task.model';

@Component({
	selector: 'app-root',
	imports: [NavBarComponent, SideNavComponent, ToDoListComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	readonly #toDoListService = inject(ToDoListService);
	readonly allLists = this.#toDoListService.toDoListsReadOnly;

	readonly openedSideNav = signal(true);
	readonly addListState = signal(false);

	toggleSideNav(): void {
		this.openedSideNav.update((prev) => !prev);
	}

	addNewList(listData: { id: string; title: string }): void {
		this.#toDoListService.addNewList(listData);
	}

	removeList(id: string): void {
		this.#toDoListService.removeList(id);
	}

	removeTask(taskData: { listId: string; taskId: string }): void {
		this.#toDoListService.removeTask(taskData.listId, taskData.taskId);
	}

	addNewTask(taskData: { listId: string; task: Task }): void {
		this.#toDoListService.addNewTask(taskData);
	}

	editList(listData: { listId: string; updatedTitle: string }): void {
		this.#toDoListService.editList(listData);
	}

	editTask(taskData: { listId: string; updatedTask: Task }): void {
		this.#toDoListService.editTask(taskData);
	}
}
