# unplugin-import-global-css

[![NPM version](https://img.shields.io/npm/v/unplugin-import-global-css?color=F70AF1&label=)](https://www.npmjs.com/package/unplugin-import-global-css)

Auto import global css for Vue.

#### Features

- less code
- simpler code structure
- faster compilation
-  supports Vite, Webpack, Vue CLI, Rollup, esbuild, powered by <a href="https://github.com/unjs/unplugin">unplugin</a>.



## effect

![image](https://github.com/SpacesoulsL/unplugin-import-global-css/blob/main/examples/vite-vue3/public/effect.png)



## install

```bash
pnpm i unplugin-import-global-css -D
```



<details>
<summary>Vite</summary><br>


```ts
import autocss from 'unplugin-import-global-css/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    autocss({ /* options */ })
  ],
})

```

<br></details>

<details>
<summary>Vue-cli</summary><br>


```ts
const autocss = require('unplugin-import-global-css/webpack')

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      autocss({ /* options */ })
    ],
  },
})
```

<br></details>

<details>
<summary>Rollup</summary><br>


```ts
// rollup.config.js
import autocss from 'unplugin-import-global-css/rollup'

export default {
  plugins: [
    autocss({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>


```ts
import { build } from 'esbuild'

build({
  plugins: [
    require('unplugin-import-global-css/esbuild')({/* options */}),
  ],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>


```ts
module.exports = {
  plugins: [
    require('unplugin-import-global-css/webpack')({ /* options */ }),
  ],
}
```

<br></details>

## Usage

Auto import all css files from `./src/styles`  into `main.(t/j)s`, as global css.

❗If your global css are not in `./src/styles`, you need to modify the plugin options.



## Options

```ts
interface Options {
    globStylesPath?: string /* The path of the css folder relative to src, default: './styles' */
    inputName?: string /* input name, default: 'main' */
    inlcude?: string[] /* include auto import node_modules css such as: reset.css */
}
```



## License
MIT License