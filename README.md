# transition

Vite + Vue3

这个是用 CSS transition 实现的排行榜过渡动画，可以参考思路，不保证兼容性

这个是基于数据驱动的思路：
* 直接修改数组元素顺序
* dom 更新前，获取 top
* dom 更新后，计算旧 top 和新 top 差作为 y 位移值
* 下一帧，设置 y 位移值为 0，执行过渡动画

未来将添加使用 `<TransitionGroup>` 的 Demo

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
