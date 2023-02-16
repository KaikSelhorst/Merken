<script setup lang="ts">
import { ref } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import emitter from "@/emitter";
import DeleteAllButton from "@/components/buttons/DeleteAllButton.vue";
import MobileButton from "@/components/buttons/MobileButton.vue";

const router = useRouter();
const isRoot = ref(router.currentRoute.value.matched.length === 1);
const query = matchMedia("(max-width:620px)");

query.addEventListener("change", () => (isMobile.value = query.matches));
onBeforeRouteUpdate((to) => {
  isRoot.value = to.matched.length === 1 ? true : false;
});
emitter.on("settings-mobile", (state) => (mobileMenu.value = state as boolean));

const menuOptions = ["General", "Theme"];
const mobileMenu = ref(false);
const isMobile = ref(query.matches);
</script>

<template>
  <section>
    <aside :class="{ active: mobileMenu }" id="aside">
      <MobileButton
        emitted-name="settings-mobile"
        controls="#aside"
        v-if="isMobile"
      />
      <nav>
        <ul>
          <li v-for="(option, index) in menuOptions" :key="index">
            <RouterLink
              @click="mobileMenu = false"
              :to="{ name: option.toLocaleLowerCase() }"
            >
              {{ option }}
            </RouterLink>
          </li>
        </ul>
        <DeleteAllButton />
      </nav>
    </aside>
    <main>
      <RouterView />
    </main>
  </section>
</template>

<style scoped>
section {
  display: grid;
  border-radius: 2px;
  border: 1px solid var(--border-color);
  margin-top: 0.75rem;
  grid-template-columns: 300px 1fr;
}

section > * {
  padding: 1rem;
}

nav {
  height: 100%;
  justify-content: start;
  align-items: flex-start;
  display: grid;
}

nav button {
  align-self: flex-end;
}

aside,
aside a {
  color: var(--font-color);
  line-height: 1.25rem;
  font-weight: 500;
  font-size: 0.8125rem;
}

main {
  color: var(--font-color);
  overflow: auto;
}

@media screen and (max-width: 900px) {
  section {
    grid-template-columns: 24% 1fr;
  }
}

@media screen and (min-width: 620px) {
  section > * {
    height: calc(90vh - 8px);
    padding: 1rem;
  }
}

@media screen and (max-width: 620px) {
  section {
    grid-template-columns: 1fr;
    grid-template-rows: min-content calc(88vh - 49px);
  }

  aside {
    position: relative;
    border-bottom: 1px solid var(--border-color);
  }

  aside nav {
    border: 1px solid var(--border-color);
    background: var(--bg-color);
    height: calc(90vh - 10px);
    top: -1px;
    left: -1px;
    position: absolute;
    padding: 1rem;
    transition: 0.3s all;
    opacity: 0;
    visibility: hidden;
    transform: translate3d(-30px, 0, 0);
  }

  aside.active nav {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
    animation: slide-in 0.3s forwards;
  }
}
</style>
