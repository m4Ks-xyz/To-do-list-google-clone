import { Injectable, signal } from '@angular/core';
import { ToDoList } from '../models/to-do-list.model';
import { Task } from '../models/tasks.model';

const STORAGE_KEY = 'toDoLists';

@Injectable({
	providedIn: 'root',
})
export class ToDoListService {
	readonly #toDoLists = signal<ToDoList[]>(this.getLists());
	readonly toDoListsReadOnly = this.#toDoLists.asReadonly();

	getLists(): ToDoList[] {
		const gettingLists = localStorage.getItem(STORAGE_KEY);
		return gettingLists ? JSON.parse(gettingLists) : [];
	}

	saveLists(toDoList: ToDoList[]): void {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(toDoList));
	}

	addNewList(newList: { id: string; title: string }): void {
		this.#toDoLists.update((lists) => {
			const updatedLists = [...lists, { ...newList, tasks: [] }];
			this.saveLists(updatedLists);
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

			this.saveLists(updatedLists);
			return updatedLists;
		});
	}

	removeList(id: string): void {
		this.#toDoLists.update((lists) => {
			const updatedLists = lists.filter((list) => list.id !== id);
			this.saveLists(updatedLists);
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
			this.saveLists(updatedLists);
			return updatedLists;
		});
	}

	editList(listData: { listId: string; updatedTitle: string }): void {
		this.#toDoLists.update((lists) => {
			const updatedLists = lists.map((list) =>
				list.id === listData.listId
					? { ...list, title: listData.updatedTitle }
					: list,
			);
			this.saveLists(updatedLists);
			return updatedLists;
		});
	}
}
