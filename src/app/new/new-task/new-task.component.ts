import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
	selector: 'app-new-task',
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
	templateUrl: './new-task.component.html',
	styleUrl: './new-task.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskComponent {
	readonly #fb = inject(FormBuilder);
	readonly dialogRef = inject(MatDialogRef);

	form = this.#fb.group({
		title: ['', Validators.required],
		description: [''],
		date: [''],
		time: [''],
		favorite: [false],
		complete: [false],
	});

	onSubmit(): void {
		this.form.controls.title.markAsTouched();
		if (this.form.valid) {
			this.dialogRef.close(this.form.value);
		}
	}
}
