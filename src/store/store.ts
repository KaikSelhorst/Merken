import { defineStore } from "pinia";
import { getLocal, setLocal } from "@/helpers";
import { computed, ref } from "vue";

import type { Workspace } from "env";

export const userStore = defineStore("user", () => {
  const getWorks = () => getLocal<Workspace[]>("workspaces");
  const works = ref(getWorks());
  const idsWorks = computed(() => works.value.map(({ id }) => id));

  const addWork = (id: number) => {
    works.value.push({ id, content: "" });
    setLocal("workspaces", works.value);
  };
  const removeWork = (id: number) => {
    works.value.forEach((work, index) => {
      if (work.id === id) works.value.splice(index, 1);
    });
    setLocal("workspaces", works.value);
  };
  const getWorkContent = (id: number) => {
    const work = works.value.filter((work) => work.id === id);
    if (work[0]) return work[0].content;
    else return null;
  };
  const updateWorkContent = (id: number, content: string) => {
    works.value.forEach((work) => {
      if (work.id === id) {
        work.content = content;
        setLocal("workspaces", works.value);
      }
    });
  };
  const updateWorks = () => (works.value = getWorks());

  if (!works.value) {
    setLocal("workspaces", [{ id: 0, content: "" }]);
    updateWorks();
  }

  return {
    works,
    idsWorks,
    addWork,
    removeWork,
    updateWorks,
    updateWorkContent,
    getWorkContent,
  };
});

// State local
// state das configurações
// Computed que retornace os elementos
// para o TheHeader id
