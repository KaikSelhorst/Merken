<script setup lang="ts">
import { ref, computed } from "vue";
import emitter from "@/emitter";
import { romanize } from "@/helpers";

import { getLocal } from "@/helpers";
import type { UserConfig } from "env";

const props = defineProps({
  to: {
    type: Object,
    required: true,
  },
  content: {
    type: Number,
    required: true,
  },
});

const setType = (value: unknown) => {
  if (typeof value === "string") type.value = value;
};

const tranformToType = computed(() => {
  if (!type.value) return props.content;
  switch (type.value) {
    case "roman":
      return romanize(props.content);
    default:
      return props.content;
  }
});

emitter.on("STYLEITEM_HAS_CHANGED", setType);
const type = ref(getLocal<UserConfig>("config").styleItem);
</script>

<template>
  <RouterLink :to="to" :class="type">{{ tranformToType }}</RouterLink>
</template>
<style scoped>
a {
  font-variant-numeric: lining-nums;
  font-size: 1.125rem;
  line-height: 1.5rem;
  padding: 0.25rem 0.5rem;
  display: block;
  overflow: hidden;
  position: relative;
}

.hasContent {
  color: var(--secondary);
}

.cicle {
  text-indent: -140px;
  margin: 0px 0.25rem;
}

.cicle::before {
  aspect-ratio: 1/1;
  height: 10px;
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transition: 0.3s all;
  border: 0.125rem solid var(--border-color);
  transform: translate3d(-50%, -50%, 0);
}

.cicle.router-link-exact-active::before {
  background: var(--primary) !important;
}

.cicle.hasContent::before {
  background: var(--secondary);
}
</style>
