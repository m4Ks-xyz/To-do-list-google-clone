import { Component, inject } from '@angular/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
	TaskFormDialogResult,
	TaskFormDialogData,
} from '../models/task-form-dialog.model';

@Component({
	selector: 'app-task-form',
	providers: [provideNativeDateAdapter()],
	imports: [
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatButtonModule,
		MatDialogModule,
		ReactiveFormsModule,
	],
	templateUrl: './task-form.component.html',
	styleUrl: './task-form.component.scss',
})
export class TaskFormDialogComponent {
	readonly #fb = inject(FormBuilder);
  
	readonly #dialogRef = inject(MatDialogRef<TaskFormDialogResult>);
	readonly initialDialogData = inject<TaskFormDialogData>(MAT_DIALOG_DATA);

	form = this.#fb.group({
		id: [this.initialDialogData.task?.id],
		title: [this.initialDialogData.task?.title],
		description: [this.initialDialogData.task?.description],
		date: [this.initialDialogData.task?.date],
		favorite: [this.initialDialogData.task?.favorite],
		complete: [this.initialDialogData.task?.complete],
	});

	onSubmit(): void {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			this.#dialogRef.close(this.form.value);
		}
	}
}
