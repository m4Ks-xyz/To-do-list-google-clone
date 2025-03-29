import { computed, effect, Injectable, signal } from '@angular/core';
import { ToDoList } from '../models/to-do-list.model';
import { Task } from '../models/task.model';

const STORAGE_KEY = 'toDoLists';

@Injectable({
	providedIn: 'root',
})
export class ToDoListService {
	constructor() {
		effect((): void => {
			this.#synchronizeLocalStorage(this.#toDoLists());
		});

		if (this.#toDoLists().length === 0) {
			this.addNewList({
				id: 'default',
				title: 'Zadania główne',
				default: true,
			});
		}
	}

	readonly #toDoLists = signal<ToDoList[]>(this.#getSavedTodos());
	readonly toDoListsReadOnly = this.#toDoLists.asReadonly();

	filteredListsFavoriteTasks = computed(() => {
		if (this.filterActive()) {
			return this.#toDoLists().map((lists) => ({
				...lists,
				tasks: lists.tasks.filter((task) => task.favorite === true),
			}));
		} else return this.#toDoLists();
	});
	filterActive = signal<boolean>(false);

	#getSavedTodos(): ToDoList[] {
		const gettingLists = localStorage.getItem(STORAGE_KEY);
		return gettingLists ? JSON.parse(gettingLists) : [];
	}

	#synchronizeLocalStorage(toDoList: ToDoList[]): void {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(toDoList));
	}

	addNewList(newList: { id: string; title: string; default: boolean }): void {
		this.#toDoLists.update((lists) => {
			const updatedLists = [...lists, { ...newList, show: true, tasks: [] }];
			return updatedLists;
		});
	}

	addNewTask(newTask: { listId: string; task: Task }): void {
		this.#toDoLists.update((lists) => {
			const updatedLists = lists.map((list) =>
				list.id === newTask.listId
					? { ...list, tasks: [...list.tasks, newTask.task] }
					: list,
			);

			return updatedLists;
		});
	}

	removeList(id: string): void {
		this.#toDoLists.update((lists) => {
			const updatedLists = lists.filter((list) => list.id !== id);
			return updatedLists;
		});
	}

	removeTask(listId: string, taskId: string): void {
		this.#toDoLists.update((lists) => {
			const updatedLists = lists.map((list) =>
				list.id === listId
					? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
					: list,
			);
			return updatedLists;
		});
	}

	editListTitle(listData: { listId: string; updatedTitle: string }): void {
		this.#toDoLists.update((lists) => {
			const updatedLists = lists.map((list) =>
				list.id === listData.listId
					? { ...list, title: listData.updatedTitle }
					: list,
			);
			return updatedLists;
		});
	}

	editTask(taskData: { listId: string; updatedTask: Task }): void {
		this.#toDoLists.update((lists) => {
			const updatedLists = lists.map((list) =>
				list.id === taskData.listId
					? {
							...list,
							tasks: list.tasks.map((task) =>
								task.id === taskData.updatedTask.id
									? taskData.updatedTask
									: task,
							),
						}
					: list,
			);
			return updatedLists;
		});
	}

	toggleListVisibility(listId: string): void {
		this.#toDoLists.update((lists) => {
			const updatedLists = lists.map((list) =>
				list.id === listId
					? {
							...list,
							show: !list.show,
						}
					: list,
			);
			return updatedLists;
		});
	}

	toggleFavoriteShow(onlyFavoriteTasks: boolean) {
		this.filterActive.set(onlyFavoriteTasks);
	}
}
