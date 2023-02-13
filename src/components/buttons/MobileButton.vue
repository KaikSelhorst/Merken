<script setup lang="ts">
import emitter from "@/emitter";
import { outsideClick } from "@/helpers";

const props = defineProps({
  emittedName: {
    type: String,
    required: true,
  },
  controls: {
    type: String,
    required: true,
  },
});

const emitterEvent = (state: boolean) => emitter.emit(props.emittedName, state);

const onClick = (event: MouseEvent) => {
  event.preventDefault();
  const clickElement = event.currentTarget;
  if (clickElement && clickElement instanceof HTMLElement) {
    emitterEvent(true);
    outsideClick(
      document.querySelector(props.controls)!,
      ["click", "touchstart"],
      () => emitterEvent(false)
    );
  }
};
</script>

<template>
  <button @click="onClick">Menu</button>
</template>
<style scoped>
button {
  color: var(--font-color);
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
  display: flex;
  align-items: center;
}

button::before {
  content: "";
  display: inline-block;
  background: currentColor;
  height: 2px;
  transition: transform 0.3s;
  width: 12px;
  margin-right: 0.25rem;
  margin-bottom: 0.09375rem;
  box-shadow: 0 0.25rem, 0 -0.25rem;
}
</style>
