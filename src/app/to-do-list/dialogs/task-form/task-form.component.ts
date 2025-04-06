import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormDialogComponent {
	readonly #fb = inject(FormBuilder);
	readonly initialDialogData = inject<TaskFormDialogData>(MAT_DIALOG_DATA);
	readonly #dialogRef = inject(MatDialogRef<TaskFormDialogResult>);

	form = this.#fb.group({
		id: [this.initialDialogData.task?.id],
		title: [
			this.initialDialogData.task?.title,
			[Validators.required, Validators.maxLength(40), Validators.minLength(3)],
		],
		description: [
			this.initialDialogData.task?.description,
			[Validators.maxLength(100), Validators.minLength(3)],
		],
		date: [this.initialDialogData.task?.date],
		time: [this.initialDialogData.task?.date],
		favorite: [
			this.initialDialogData.task?.favorite
				? this.initialDialogData.task?.favorite
				: false,
		],
		complete: [this.initialDialogData.task?.complete],
	});

	#getMergedDates(
		date: string | null | undefined,
		time: string | null | undefined,
	): string | null | undefined {
		if (!date && !time) {
			return null;
		}
		if (!date && time) {
			return time;
		}
		if (date && !time) {
			return date;
		}

		const mergedDate = new Date(date!);
		const timeAsDate = new Date(time!);
		mergedDate.setHours(timeAsDate.getHours(), timeAsDate.getMinutes());
		return mergedDate.toISOString();
	}

	onSubmit(): void {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			const formValue = this.form.value;
			this.#dialogRef.close({
				...formValue,
				date: this.#getMergedDates(formValue.date, formValue.time),
			});
		}
	}
}
