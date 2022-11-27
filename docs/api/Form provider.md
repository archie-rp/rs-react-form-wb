---
sidebar_position: 2
---

Context provider for more complex forms.
With nested components we can use other hooks to acces the form.
We can use <a href="/docs/api/hooks/#useformfield">useFormField</a> for accessing the especific field.

```javascript
import React from 'react';
import { FormProvider, useForm } from '@resourge/react-form'

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

export function App() {
  const {
    context
  } = useForm( ... )

  return (
    <FormProvider context={context}>
      <CustomElement />
      ...
    </FormProvider>
  )
}
```
