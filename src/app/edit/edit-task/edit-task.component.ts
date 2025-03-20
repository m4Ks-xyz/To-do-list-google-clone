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

@Component({
	selector: 'app-edit-task',
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
	templateUrl: './edit-task.component.html',
	styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent {
	readonly #fb = inject(FormBuilder);
	readonly #initialDialogData = inject(MAT_DIALOG_DATA);
	readonly #dialogRef = inject(MatDialogRef);

	form = this.#fb.group({
		id: [this.#initialDialogData.id],
		title: [this.#initialDialogData.title],
		description: [this.#initialDialogData.description],
		date: [this.#initialDialogData.date],
	});

	onSubmit(): void {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			this.#dialogRef.close(this.form.value);
		}
	}
}
