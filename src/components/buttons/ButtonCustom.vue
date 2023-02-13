<script setup lang="ts">
import { ref } from "vue";
import emitter from "@/emitter";
import ButtonLarge from "./ButtonLarge.vue";
import ButtonSmall from "./ButtonSmall.vue";
import BaseInput from "./BaseInput.vue";

const onSubmit = () => {
  open.value = false;
  if (customFont.value) {
    emitter.emit("UPDATE_USER_CONFIG", { family: customFont.value });
  }
};

emitter.on("FAMILY_IS_CUSTOM", (state) => (isCustom.value = state as boolean));

const open = ref(false);
const customFont = ref("");
const isCustom = ref(false);
</script>

<template>
  <ButtonLarge @click="open = true" id="custom" :class="{ active: isCustom }">
    Custom
  </ButtonLarge>
  <Teleport to="body">
    <form class="modal" v-if="open" @submit.prevent="onSubmit">
      <ButtonSmall class="closeButton">
        <FontAwesome icon="close" />
      </ButtonSmall>
      <label for="font-name">Custom Font</label>
      <BaseInput v-model="customFont" label="Font Name" type="text" />
      <p>
        Make sure you have the font installed on your computer before applying
      </p>
      <ButtonLarge type="submit">Apply</ButtonLarge>
    </form>
  </Teleport>
</template>
<style scoped>
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  background: var(--background);
  border: 1px solid var(--border-color);

  color: var(--font-color);
  width: 50vw;
  max-width: 450px;
  padding: 32px;
  border-radius: 2px;
  gap: 1rem;
  display: grid;

  grid-auto-rows: min-content;
}

label {
  font-size: 2rem;
  line-height: 3rem;
}

input {
  outline: none;
  width: 100%;
  height: 36px;
  font-size: 1rem;
  border-radius: 2px;
  background-color: var(--bg-button);
  padding: 0.0375rem;
  color: var(--font-color);
  border: 1px solid var(--border-color);
}

p {
  margin-bottom: 0.75rem;
}

button[type="submit"] {
  font-size: 1rem;
  height: 36px;
  margin-bottom: 0.5rem;
}

button.active {
  background: var(--primary);
}

.closeButton {
  position: absolute;
  top: 8px;
  right: 8px;
}

@media screen and (max-width: 520px) {
  .modal {
    width: 80vw;
  }
}
</style>
