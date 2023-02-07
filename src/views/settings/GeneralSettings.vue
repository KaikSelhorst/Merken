<script setup lang="ts">
import FontSize from "@/components/generalSettings/FontSize.vue";
import FontFamily from "@/components/generalSettings/FontFamily.vue";
import ShortCuts from "@/components/generalSettings/ShortCuts.vue";
import StyleItem from "@/components/generalSettings/StyleItem.vue";
</script>

<template>
  <div class="settings">
    <article>
      <h1>General</h1>
      <p>Make some modifications to your app, leaving it your way. *_*</p>
      <FontSize />
      <FontFamily />
      <StyleItem />
      <ShortCuts />
    </article>
  </div>
</template>

<style scoped></style>
