<script setup lang="ts">
import { ref } from "vue";
import emitter from "@/emitter";

import type { UserConfig } from "env";
import { getLocal } from "@/helpers";

import SecondaryTitle from "../SecondaryTitle.vue";
import ButtonSmall from "@/components/ButtonSmall.vue";

const onSubmit = () => {
  if (Number(fontSize.value) > 0.6 && Number(fontSize.value) < 2.6)
    emitter.emit("UPDATE_USER_CONFIG", { font: String(fontSize.value) });
};

const { font } = getLocal<UserConfig>("config");
const fontSize = ref(font);
</script>

<template>
  <div>
    <SecondaryTitle icon="font">Font-Size</SecondaryTitle>
    <p>Change the font size of the application.</p>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model.number="fontSize" required />
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
  background-color: var(--jet);
  padding: 6px;
  color: var(--white);
  border: 1px solid var(--davys-gray);
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
