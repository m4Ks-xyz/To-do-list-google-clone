import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToDoList } from '../../to-do-list/models/to-do-list.model';
import { ListFormDialogComponent } from '../list-form-dialog/list-form.component';
import {
	ListFormDialogData,
	ListFormDialogResult,
} from '../models/list-form-dialog.model';

@Injectable({
	providedIn: 'root',
})
export class ListFormDialogService {
	readonly #dialog = inject(MatDialog);

	async openAddListDialog(list?: ToDoList) {
		const dialogCmp = await import(
			'../list-form-dialog/list-form.component'
		).then((m) => m.ListFormDialogComponent);

		return this.#dialog.open<
			ListFormDialogComponent,
			ListFormDialogData,
			ListFormDialogResult
		>(dialogCmp, { data: {  list, mode: 'add' } });
	}

	async openEditListDialog(list: ToDoList) {
		const dialogCmp = await import(
			'../list-form-dialog/list-form.component'
		).then((m) => m.ListFormDialogComponent);

		return this.#dialog.open<
			ListFormDialogComponent,
			ListFormDialogData,
			ListFormDialogResult
		>(dialogCmp, {
			data: {
				list,
				mode: 'edit',
			},
		});
	}
}
