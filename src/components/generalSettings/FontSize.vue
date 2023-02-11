<script setup lang="ts">
import { ref } from "vue";
import emitter from "@/emitter";

import type { UserConfig } from "env";
import { getLocal } from "@/helpers";

import MediumTitle from "../MediumTitle.vue";
import ButtonSmall from "@/components/buttons/ButtonSmall.vue";
import BaseInput from "../buttons/BaseInput.vue";

const onSubmit = () => {
  console.log(fontSize.value);
  if (fontSize.value > 0.6 && fontSize.value < 2.6)
    emitter.emit("UPDATE_USER_CONFIG", { font: String(fontSize.value) });
};

const { font } = getLocal<UserConfig>("config");
const fontSize = ref(Number(font));
</script>

<template>
  <div>
    <MediumTitle icon="font">Font-Size</MediumTitle>
    <p>Change the font size of the application.</p>
    <form @submit.prevent="onSubmit">
      <BaseInput
        v-model.number="fontSize"
        type="text"
        required
        label="1 = 16px"
      />
      <ButtonSmall>
        <FontAwesome icon="save" />
      </ButtonSmall>
    </form>
  </div>
</template>
<style scoped>
div {
  display: grid;
  align-items: center;
  grid-template-columns: 2fr 1fr;
}
form {
  font-size: 0.875rem;
  gap: 12px;

  display: flex;
}
input {
  outline: none;
  width: 100%;
  font-size: 0.875rem;
  border-radius: 2px;
  background-color: var(--bg-input);
  padding: 6px;
  color: var(--font-color);
  border: 1px solid var(--border-color);
}
@media screen and (min-width: 620px) {
  form {
    justify-content: end;
    align-self: center;
    grid-row: 1/3;
    grid-column: 2;
  }
}
@media screen and (max-width: 620px) {
  div {
    grid-template-columns: 1fr;
  }
}
</style>
