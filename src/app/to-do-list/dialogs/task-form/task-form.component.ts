import { Component, inject } from '@angular/core';
import {
	FormBuilder,
	ReactiveFormsModule,
	FormsModule,
	Validators,
} from '@angular/forms';

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
import {
	TaskFormDialogResult,
	TaskFormDialogData,
} from '../models/task-form-dialog.model';
import { MatTimepickerModule } from '@angular/material/timepicker';

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
		MatTimepickerModule,
	],
	templateUrl: './task-form.component.html',
	styleUrl: './task-form.component.scss',
})
export class TaskFormDialogComponent {
	readonly #fb = inject(FormBuilder);

	readonly initialDialogData = inject<TaskFormDialogData>(MAT_DIALOG_DATA);
	readonly #dialogRef = inject(MatDialogRef<TaskFormDialogResult>);

	form = this.#fb.group({
		id: [this.initialDialogData.task?.id],
		title: [
			this.initialDialogData.task?.title,
			{
				validators: [Validators.required, Validators.maxLength(40)],
			},
		],
		description: [
			this.initialDialogData.task?.description,
			Validators.maxLength(100),
		],
		date: [this.initialDialogData.task?.date],
		time: [this.initialDialogData.task?.time],
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
