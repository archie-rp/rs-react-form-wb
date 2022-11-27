---
sidebar_position: 4
---


## Yup

To simplify the process of converting errors from diferent validation packages like joi, yup, zod, ajv, etc to `useForm` hook lookalike errors, use `setDefaultOnError`. You only need to setup this on the initialization of the application in this case App.tsx.

`setDefaultOnError` will, by default (unless `onError` from Form Options is set), customize the errors to fit `useForm` errors

```javascript
// In App.tsx
import { setDefaultOnError } from '@resourge/react-form'

setDefaultOnError((errors: any) => {
  // Customize errors to fit the model 
  // [{ path, errors }]
  return []
});
```

- Note: We plan to add more default validations in the future. If you have one and want to share, please do and contribute.

- For yup validation, `setFormYupValidation`

```javascript
// In App.tsx
import { setDefaultOnError } from '@resourge/react-form'

setDefaultOnError((errors: any) => {
  // Customize errors to fit the model 
  // [{ path, errors }]
  return []
});
```

Example:

```javascript

type UserType = {
  name: string
  age: number
  email: string
  createdAt?: string
}

export class UserModel {
 public name = ''
 public age = 18
 public email = ''
 public createdAt?: Date

 constructor(model?: UserType) {
  if (model) {
   this.name = model.name
   this.age = model.age
   this.email = model.email
      if(model.createdAt) {
        this.createdAt = new Date(model.createdAt)
      }
    }   
  }
}

const schema = object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
});

const { form, ...} = useForm<UserModel>(new UserModel(model), {
  validate: (form: UserModel, changedKeys) => {
    return schema.validate(form, changedKeys)
  },
})

```

## Resource Scheme

We have created a better improved schema validation to replace the other libraries like, yup, zod, fast-validator, etc.
This libraries has all improvements, comes with extra essentials validations and until know is the fastest one we know.
You can get it in here <a href="https://resourge-schema-validator.netlify.app/">Resource Schema</a>.

```javascript
export type UserType = {
 name: string
 age: number
 location: LocationType
 hobbies: Array<keyof typeof HobbiesEnum>
}

export class UserModel {
 public name = ''
 public age = 16
 public location: LocationType = { address: '', city: '', postalCode: '', phoneNumber: '' }
 public hobbies: Array<keyof typeof HobbiesEnum> = []

 constructor(model?: UserType) {
  if (model) {
   this.name = model.name
   this.age = model.age
   this.location = model.location
  }
 }
}

const schema = object<UserModel>({
 name: string().min(10).required(),
 age: number().min(16).required(),
 location: object({
  city: string().required(),
  address: string().required(),
  postalCode: string().postalCode(PostalCodes.PT).required(),
  phoneNumber: string().phoneNumber(PhoneNumbers.am_AM).required()
 })
}).compile();

export const useUserModel = (model?: UserType) => {
 return useForm<UserModel>(new UserModel(model), {
  validate: (form: UserModel, changedKeys) => {
   return schema.validate(form, changedKeys)
  },
 })
}
```

In the form component when you trigger the `handlerSubmit` function will validate the form with the schema.
Preventing to submit the form in case theres errors in the form.
We can read the errors by using <a href="/docs/api/Form%20actions#geterrors">Errors</a>
