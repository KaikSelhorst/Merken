<script setup lang="ts">
import { ref } from "vue";
import emitter from "@/emitter";
import { outsideClick } from "@/helpers";

const props = defineProps({
  emittedName: {
    type: String,
    required: true,
  },
});

const emitterMobileEvent = () => emitter.emit(props.emittedName);
const onClick = (event: MouseEvent) => {
  const clickElement = event.currentTarget;
  if (clickElement && clickElement instanceof HTMLElement) {
    emitterMobileEvent();
    outsideClick(clickElement, ["click", "touchstart"], emitterMobileEvent);
  }
};
</script>

<template>
  <button @click="onClick">Menu</button>
</template>
<style scoped>
button {
  color: var(--platinum);
  font-weight: 500;
  font-size: 0.75rem;
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
  margin-right: 4px;
  box-shadow: 0 4px, 0 -4px;
}
</style>
