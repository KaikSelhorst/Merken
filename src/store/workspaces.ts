import { defineStore } from "pinia";
import { getLocal, setLocal } from "@/helpers";
import type { Workspace } from "env";
import { computed, ref } from "vue";

export const userWorkspaces = defineStore("workspaces", () => {
  const getWorks = () => getLocal<Workspace[]>("workspaces");
  const getLastID = () => worksID.value.at(-1)! + 1;
  const works = ref(getWorks());
  const worksID = computed(() => works.value.map(({ id }) => id));

  const worksHasContent = computed(() =>
    works.value.filter(({ content }) => !!content).map(({ id }) => id)
  );

  const addWork = (id: number) => {
    if (works.value.length >= 5) return;
    works.value.push({ id, content: "" });
    setLocal("workspaces", works.value);
    return true;
  };

  const removeWork = (id: number) => {
    works.value.forEach((work, index) => {
      if (work.id === id) works.value.splice(index, 1);
    });
    setLocal("workspaces", works.value);
    verifyWorks();
  };

  const getWorkContent = (id: number) => {
    const work = works.value.filter((work) => work.id === id)[0];
    if (work) return work.content;
    else return null;
  };

  const updateWorkContent = (id: number, content: string) => {
    works.value.forEach((work) => {
      if (work.id === id) work.content = content;
      setLocal("workspaces", works.value);
    });
  };

  const verifyWorks = () => (works.value.length ? null : resetWorks());

  const resetWorks = () => {
    setLocal("workspaces", [{ id: 1, content: "" }]);
    works.value = getWorks();
  };

  verifyWorks();

  return {
    works,
    worksID,
    worksHasContent,
    addWork,
    getLastID,
    removeWork,
    resetWorks,
    verifyWorks,
    getWorkContent,
    updateWorkContent,
  };
});
