import { ref, computed } from "vue";
import { getLocal, setLocal } from "@/helpers";
import type { Workspace } from "env";

export const userWorkspaces = () => {
  const getWorks = () => getLocal<Workspace[]>("workspaces");
  const works = ref(getWorks());
  const worksID = computed(() => works.value.map(({ id }) => id));

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
  const updateWorks = () => (works.value = getWorks());
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
  if (!works.value) {
    setLocal("workspaces", [{ id: 0, content: "" }]);
    updateWorks();
  }
  return {
    works,
    worksID,
    addWork,
    removeWork,
    updateWorks,
    getWorkContent,
    updateWorkContent,
  };
};
