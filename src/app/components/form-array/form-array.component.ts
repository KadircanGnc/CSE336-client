import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(),
    topics: new FormArray<FormControl>([])
  });

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: ['',Validators.required],
      contact: fb.group({
        email: [''],
        phone: ['']
      }),
      topics: fb.array([])
    });
  }

  get topics(): FormArray<FormControl> {
    return this.form.get('topics') as FormArray<FormControl>;
  }

  addTopic(topic: HTMLInputElement) {
    if (topic.value.trim()) {
      this.topics.push(new FormControl(topic.value.trim()));
      topic.value = '';
    }
  }

  removeTopic(index: number) {
    this.topics.removeAt(index);
  }
}
