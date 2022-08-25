<script setup lang="ts">
import { nextTick, reactive } from "vue";
import { nextFrame, zip } from "./util";

const list: {
  name: string;
  hue: number;
  ty: number;
  el?: HTMLElement;
  transition?: string;
}[] = reactive(
  [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
  ].map((name) => ({
    name,
    hue: (Math.random() * 360) | 0,
    ty: 0,
  }))
);

const transition = async (transition = "1s") => {
  // 更新前，获取 top
  const preTop = list.map(({ el }) => el?.getBoundingClientRect().top ?? 0);
  list.forEach((item) => delete item.transition);
  await nextTick();
  // 更新后，计算 top 差作为 y 位移值
  zip(list, preTop).forEach(([item, preTop]) => {
    item.ty = preTop - (item.el?.getBoundingClientRect().top ?? 0);
  });
  await nextFrame();
  // 下一帧，执行过渡动画
  list.forEach((item) => {
    item.ty = 0;
    item.transition = transition;
  });
};

const up = (from: number, to: number) => {
  const upItem = list[from];
  while (from > to) list[from] = list[--from];
  list[to] = upItem;
  transition();
};

const shuffle = () => {
  for (let i = list.length; i > 1; ) {
    const j = (Math.random() * i--) | 0;
    [list[i], list[j]] = [list[j], list[i]];
  }
  transition();
};

const randomUp = () => {
  const i = (Math.random() * (list.length - 1) + 1) | 0;
  const j = (Math.random() * i) | 0;
  // 一次 random 算法
  // const n = list.length;
  // const k = ((Math.random() * n * (n - 1)) / 2 + 1) | 0;
  // const i = Math.ceil((Math.sqrt(k * 8 + 1) - 1) / 2);
  // const j = (i * (i + 1)) / 2 - k;
  up(i, j);
};
</script>

<template>
  <div class="container">
    <div
      v-for="(item, index) of list"
      :key="item.name"
      :data-name="item.name"
      :ref="(el) => (item.el = el as HTMLElement)"
      :style="{
        backgroundColor: `hsl(${item.hue}, 100%, 80%)`,
        transform: `translateY(${item.ty}px)`,
        transition: item.transition,
        zIndex: list.length - index,
      }"
    ></div>
  </div>
  <div class="buttons">
    <button @click="up(7, 0)">From 8 To 1</button>
    <button @click="randomUp">Random Up</button>
    <button @click="shuffle">Shuffle</button>
  </div>
</template>

<style scoped>
.container {
  display: flow-root;
  width: 300px;
  padding-top: 0.6em;
  counter-reset: i;
}
.container > * {
  display: flex;
  padding: 1em;
  margin-bottom: 0.6em;
}
.container > ::before {
  counter-increment: i;
  content: counter(i);
  font-weight: bold;
}
.container > ::after {
  content: attr(data-name);
  margin: auto;
  font-weight: bold;
}
.buttons {
  display: flex;
  flex-direction: column;
  margin: 1em;
}
.buttons > * {
  font-size: 1.6em;
}
.buttons > :not(:last-child) {
  margin-bottom: 1em;
}
</style>

<style>
#app {
  display: flex;
  margin: 1em;
}
</style>
