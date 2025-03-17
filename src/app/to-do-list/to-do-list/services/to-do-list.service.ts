import { Injectable, signal } from '@angular/core';
import { ToDoList } from '../models/to-do-list.model';

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

	removeList(id: string): void {
		this.#toDoLists.update((lists) => {
			const updatedLists = lists.filter((list) => list.id !== id);
			this.saveLists(updatedLists);
			return updatedLists;
		});
	}
}
