# builtins

> fork from [builtins](https://github.com/juliangruber/builtins) v5.0.1

[![CI](https://github.com/juliangruber/builtins/actions/workflows/ci.yml/badge.svg)](https://github.com/juliangruber/builtins/actions/workflows/ci.yml)

List of node.js [builtin modules](http://nodejs.org/api/).

## Usage

```js
import builtins from 'esm-builtins'
```

Get list of core modules for current Node.js version:

```js
assert(builtins().includes('http'))
```

Get list of core modules for specific Node.js version:

```js
assert(builtins({ version: '6.0.0' }).includes('http'))
```

Get list of core modules present in one or mode Node.js versions:

```js
assert(builtins({ version: '*' }).includes('worker_threads'))
```

Add experimental modules to the list:

```js
assert(builtins({ experimental: true }).includes('wasi'))
```

## License

MIT
