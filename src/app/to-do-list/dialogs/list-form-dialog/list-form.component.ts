import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
	MatDialogRef,
	MatDialogModule,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
	ListFormDialogData,
	ListFormDialogResult,
} from '../models/list-form-dialog.model';
@Component({
	selector: 'app-edit-list',
	templateUrl: './list-form.component.html',
	imports: [
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatDialogModule,
		ReactiveFormsModule,
	],
	styleUrl: './list-form.component.scss',
	providers: [provideNativeDateAdapter()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListFormDialogComponent {
	readonly #fb = inject(FormBuilder);

	readonly dialogRef = inject(MatDialogRef<ListFormDialogResult>);
	readonly initialDialogData = inject<ListFormDialogData>(MAT_DIALOG_DATA);

	form = this.#fb.group({
		id: [this.initialDialogData.list?.id],
		show: [this.initialDialogData.list?.id],
		title: [
			this.initialDialogData.list?.title,
			{
				validators: [
					Validators.required,
					Validators.maxLength(40),
					Validators.minLength(3),
				],
			},
		],
		default: [false],
		tasks: [this.initialDialogData.list?.tasks],
	});

	onSubmit(): void {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			this.dialogRef.close(this.form.value);
		}
	}
}
