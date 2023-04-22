import { useRoute } from "vue-router";
import { userWorkspaces } from "@/store/workspaces";
import { goTo } from "@/helpers";

// Disable Keybinds of navigator
const reset = () => {
  document.onkeydown = function (e: KeyboardEvent) {
    if ("123456".indexOf(e.key) != -1 && e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
};

const shortCuts = () => {
  const workspaces = userWorkspaces();
  const route = useRoute();

  const KeyD = (id: number) => {
    const hasContent = workspaces.worksHasContent.includes(id);
    if (!hasContent || confirm(`Do you want to delete Workspace ${id}?`)) {
      workspaces.removeWork(id);
      goTo(workspaces.worksID.at(-1)!);
    }
  };
  const KeyT = () => {
    const id = workspaces.getLastID();
    if (workspaces.addWork(id)) goTo(id);
  };

  // Enable application shortscut
  document.onkeyup = function (event: KeyboardEvent) {
    event.preventDefault();
    const e = event || window.event;
    if (!e.ctrlKey) return;

    if (e.altKey) {
      const keys: { [key: string]: Function } = {
        KeyD,
        KeyT,
      };
      keys[e.code](+route.params.id);
    }

    // To switch in between of the workspaces
    if ("123456".indexOf(e.key) !== -1) {
      const work = workspaces.worksID[+e.key - 1];
      if (work || work == 0) goTo(work);
    }
  };
};

export const useShortcuts = () => {
  reset();
  shortCuts();
};
