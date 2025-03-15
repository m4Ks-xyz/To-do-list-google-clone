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
}
