import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
	MatDialogRef,
	MatDialogModule,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
	selector: 'app-edit-list',
	templateUrl: './edit-list.component.html',
	imports: [
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatDialogModule,
		ReactiveFormsModule,
	],
	styleUrl: './edit-list.component.scss',
	providers: [provideNativeDateAdapter()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditListComponent {
	readonly #fb = inject(FormBuilder);
	readonly #initialDialogData = inject(MAT_DIALOG_DATA);
	readonly dialogRef = inject(MatDialogRef);

	form = this.#fb.group({
		title: [this.#initialDialogData],
	});

	onSubmit(): void {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			this.dialogRef.close(this.form.value);
		}
	}
}
