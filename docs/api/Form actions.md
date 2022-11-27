---
sidebar_position: 1
---

All the methods we provide to create forms.

## field

Method to connect the form element to the key by providing native attributes like `onChange`, `name`, etc.

```javascript
const {
  field
} = useForm(
  {
    name: 'Rimuru'
  }
)

<input {...field('name')} />

/// For validating when changing the value without triggering the submit to get the error validation
<input {...field('name', { validate: true })} />
```

## triggerChange

Method to make multiple changes in one render.

```javascript
const {
  triggerChange
} = useForm(
  {
    name: 'Rimuru'
  }
)

triggerChange((form) => {
  form.name = 'Rimuru_edited';
})
```

## handleSubmit

Method to handle form submission and prevent the submission if theres errors.

```javascript
const onSubmit = handleSubmit((form) => {
  /// Will only be called when form is valid
  /// do something with it
})
//
const onSubmit = handleSubmit(
  (form) => {
    /// Will always be called 
    /// because the next method returns true
    /// do something with it
  },
  (errors) => true 
)
```

## Form Data

Form data is the default form values. Can be a simple object or a class (I made it specifically for class support)

Rules:

- Only constrains `Form Data` to an object. Meaning that it's possible to have elements with `moment`, `dayjs`, `class's`, `luxonas`, etc.
- Cached on the first render (changes will not affect the form data).

Example with plain object

```javascript

// definition of a plain object
const user = {
    name: 'Rimuru',
    age: 39
}

// usage with an object
const {
  ...
} = useForm(
  user
)
```

Example with Class

```javascript
// definition of class
class User {
  name = 'Rimuru';
  age = 39
  
  get fullName() {
    return `${this.name} Tempest`
  }
}

// usage with a class
const {
  ...
} = useForm(
  new User()
)
```

## watch

Executes methods when "watched key" is touched.

```javascript
const {
  watch
} = useForm(
  {
    name: 'Rimuru'
  }
)
...
// When 'name' is `touched` it will update again with the new name
// It does not rerender again, its a one time deal for every watch
// Order is important as well, as it will be executed by order in render
watch('name', (form) => {
  form.name = 'Rimuru Tempest';
})
```

## setError

Method to set custom errors.

```javascript
const {
  setError
} = useForm(
  {
    name: 'Rimuru'
  }
)
...
setError([
  {
    key: 'name',
    message: 'Beautiful name'
  }
])
```

## hasError

Returns a boolean for the matched key.

```javascript
const {
  hasError
} = useForm(
  {
    product: {
      name: 'Apple',
      category: {
        name: 'Food',
        type: {
          name: 'Solid',
          type: 'Vegetal'
        }
      }
    }
  }
)
...
hasError('product.category') 
/// Can return (depends on the validation)
```

## getErrors

Returns error messages for the matched key.

```javascript
const {
  getErrors
} = useForm(
  {
    product: {
      name: 'Apple',
      category: {
        name: 'Food',
        type: {
          name: 'Solid',
          type: 'Vegetal'
        }
      }
    }
  }
)
...
getErrors('product.category') /// [<<Error Messages>>]
```

## reset

Resets form state.

```javascript
const {
  reset
} = useForm(
  {
    name: 'Rimuru'
  }
)
...
reset({
  name: 'Rimuru Tempest'
})

/// Validates new data, triggers validation
reset(
  {
    name: 'Rimuru Tempest'
  },
  {
    validate: true
  }
)
```

## merge

Unlike reset, `merge` will merge a new partial form to the new form.

```javascript
const {
  merge
} = useForm(
  {
    name: 'Rimuru',
    age: '40'
  }
)
...
merge({
  age: '39'
})
```

## onChange

Returns a method to change key value.

```javascript
const {
  onChange
} = useForm(
  {
    name: 'Rimuru'
  }
)
...
onChange('name')

/// Validates form on change
onChange('name', { validate: true })

<input onChange={onChange('name')} />
```

## changeValue

Simplified version of `onChange`, without the return method.

```javascript
const {
  changeValue
} = useForm(
  {
    name: 'Rimuru',
    age: '40'
  }
)
...
changeValue('name', 'Rimuru Tempest')

/// Validates form on change
changeValue('name', 'Rimuru Tempest', { validate: true })
```

## getValue

Return the value for the matched key.

```javascript
const {
  changeValue
} = useForm(
  {
    name: 'Rimuru'
  }
)
...
getValue('name') /// Rimuru
```

## resetTouch

Clears touch's for the form.

```javascript
const {
  resetTouch
} = useForm(
  ...
)
...
resetTouch()
```

## resetTouch

Revert last change if available.

```javascript
const {
  undo
} = useForm()
...
undo()
```

## redo

Forward last undo if available.

```javascript
const {
  redo
} = useForm()
...
redo()
```

## All actions

`useForm` returns `State` and `Actions`.

All actions available on `useForm`:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **form** | `object` | [`formData`](#form-data) | Form data |
| **errors** | `{ [form path]: [path error messages] }` | undefined | Depends if `useForm` `validate` is set. (ex: { 'user.name': ['Name is required'] }) |
| **isValid** | `boolean` | false | Form state by default is false if `errors` are undefined or an empty object |
| **touches** | `{ [form path]: boolean }` | {} | Form touches (ex: { 'user.name': true }) |
| **isTouched** | `boolean` | false | Form touches state by default is false if `touches` are undefined or an empty object |
| **context** | `object` | [Form State](#form-state) | Context, mainly for use in `FormProvider` |
| **formState** | `object` | `object` | Virtual Form Data, that provides a virtual representation of the form data to individually find errors/isTouched/isValid on each key (includes deep keys) |

