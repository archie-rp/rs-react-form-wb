---
sidebar_position: 3
---

All the hooks we provide.

## useForm

This hook is the main hook for creating the form:

```javascript
import React, { useState } from 'react';
import { useForm } from '@resourge/react-form';

export default function LoginForm() {
  const { 
    isValid,
    field, 
    handleSubmit 
  } = useForm(
    { 
      username: '',
      password: '' 
    }
  )
```

Options we can use on `useForm`:

|  Name  |  Type  |  Required  |   Description |
|--- |--- |--- |--- |
|  **validateDefault**  |  `boolean`  |  false  |  Set's global validation. False by default  |
|  **validate** |  `(form: T) =>  Promise<void>`  |  false  |  Method to validate form. Usually with some kind of validator. (like yup, zod, joi, etc)  |
|  **isValid**  |  `({ form, isValid, errors }) => boolean`  |  false  |  Method to define if form is valid  |
|  **onErrors**  |  `(errors: any[]) => FormErrors`  |  false  |   Local method to treat errors. |
|  **onTouch**  |  `(key: FormKey<T>, value: unknown, previousValue: unknown) => void` |  false  |  Method called every time a value is changed  |

## useFormField

This hook only works when <a href="/docs/api/Form provider"> Form Provider</a> is available.

When using form provider we can use `useFormField` for accesing the field when nested in component.

```javascript
export function CustomElement() {
  // field is the same as doing field('name')
  const { field, formContext } = useFormField('name')

  return (
    <>
      <span>
      {
        formContext.isValid ? "Valid" : "Invalid" 
      } CustomElement
      </span>
      <input {...field} />
    </>
  )
}
```

## useController

For more complex and deep forms, where render's can impact performance (like list's with multiple elements) `Controller` serves to minimize the impact a render can have on react, by only updating children if key `name` is `touched`.

```javascript
import React from 'react';
import { Controller, useFormField, useForm } from '@resourge/react-form'

function CustomElement({ value }: { value: number }) {
  const { 
    field
  } = useController()

  return (
    <div>
      { value } <button
        onClick={() => {
          field.onChange && field.onChange(Math.random())
        }}
      >
        Update with random value
      </button>
    </div>
  )
}

export function App() {
  const {
    context,
    form
  } = useForm({
    list: Array.from({ length: 1000 }).map((_, index) => index + 1)
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {
        form.list.map((value, index) => (
          <Controller
            key={`${index}`}
            name={`list[${index}]`}
            context={context}
          >
            <CustomElement value={value} />
          </Controller>
        ))
      }
    </div>
  )
}
```
