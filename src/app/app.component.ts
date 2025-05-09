import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideNavComponent } from './nav-bar/side-nav/side-nav.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoListService } from './to-do-list/services/to-do-list.service';
import { Task } from './to-do-list/models/task.model';

@Component({
	selector: 'app-root',
	imports: [NavBarComponent, SideNavComponent, ToDoListComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	readonly #toDoListService = inject(ToDoListService);
	readonly allLists = this.#toDoListService.filteredListsFavoriteTasks;

	readonly openedSideNav = signal(this.#isLargeDevice);
	readonly addListState = signal(false);

	readonly filterActive = this.#toDoListService.filterActive;
	readonly defaultListId = this.#toDoListService.defaultListId;

	get #isLargeDevice(): boolean {
		if (typeof window !== 'undefined') {
			return window.innerWidth >= 996;
		}
		return false;
	}

	toggleSideNav(): void {
		this.openedSideNav.update((prev) => !prev);
	}

	addNewList(listData: { id: string; title: string; default: boolean }): void {
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
		this.#toDoListService.editListTitle(listData);
	}

	editTask(taskData: { listId: string; updatedTask: Task }): void {
		this.#toDoListService.editTask(taskData);
	}

	toggleListVisibility(listId: string): void {
		this.#toDoListService.toggleListVisibility(listId);
	}

	toggleFavoriteShow(onlyFavoriteTasks: boolean): void {
		this.#toDoListService.toggleFavoriteShow(onlyFavoriteTasks);
	}
}
