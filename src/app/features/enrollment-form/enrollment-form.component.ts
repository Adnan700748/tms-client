import { Component, inject, signal } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-enrollment-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./enrollment-form.component.html",
  styleUrl: "./enrollment-form.component.scss",
})
export class EnrollmentFormComponent {

  // Dependency Injection
  private fb = inject(FormBuilder);

  // Tracks whether the form has been successfully submitted
  submitted = signal(false);

  // Reactive Form
  form = this.fb.nonNullable.group({
    studentId: [
      "",
      [
        Validators.required,
        Validators.pattern("^STU-[0-9]{4}$"),
      ],
    ],

    courseId: [
      "",
      Validators.required,
    ],

    term: [
      "Fall 2026",
      Validators.required,
    ],

    notes: [
      "",
    ],

    backupCourses: this.fb.array<FormControl<string>>([]),
  });

  // Shortcut for the FormArray
  get backups(): FormArray<FormControl<string>> {
    return this.form.controls.backupCourses;
  }

  // Add another backup course
  addBackup(): void {
    this.backups.push(
      this.fb.control("", {
        nonNullable: true,
        validators: Validators.required,
      })
    );
  }

  // Remove a backup course
  removeBackup(index: number): void {
    this.backups.removeAt(index);
  }

  // Submit
  submit(): void {
    if (this.form.valid) {

      const payload = this.form.getRawValue();

      console.log("Enrollment payload:", payload);

      this.submitted.set(true);

    } else {

      this.form.markAllAsTouched();

    }
  }
}