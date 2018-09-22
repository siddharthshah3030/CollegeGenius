# Async-aware Dependency Injection

`asyncdi` checks whether a function is meant to be called asynchronously by
detecting the name of its last argument.

It then provides a consistent calling interface as well as introspection info
about the expected arguments.

## Installation

```js
npm install asyncdi
```

## Usage

See [the tests](https://github.com/JedWatson/asyncdi/blob/master/tests.js)
for example usage.
