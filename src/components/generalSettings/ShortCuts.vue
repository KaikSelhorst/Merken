<script setup lang="ts">
import MediumTitle from "../MediumTitle.vue";
import ShortcutsItem from "../ShortcutsItem.vue";
</script>

<template>
  <div>
    <MediumTitle icon="keyboard">Shortcuts</MediumTitle>
    <ul>
      <li>
        <ShortcutsItem
          title="Create new Workspace"
          :shortcuts="['Ctrl', 'alt', 't']"
        />
      </li>
      <li>
        <ShortcutsItem
          title="Delete actual workspace"
          :shortcuts="['Ctrl', 'alt', 'd']"
        />
      </li>
      <li>
        <ShortcutsItem title="Switch workspaces" :shortcuts="['Ctrl', '1-6']" />
      </li>
    </ul>
  </div>
</template>
<style scoped></style>
