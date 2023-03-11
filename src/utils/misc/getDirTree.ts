import { removeKeys } from "./removeKeys";

export type Tree = {
  root: string;
  absRoot: string;
  branches?: Tree[];
};

type NotOptimizedList = {
  root: string;
  absRoot: string;
  isLeafRoot?: boolean;
  branches?: NotOptimizedList[];
};

export const getDirTree = (directories: string[]): Tree[] => {
  const splitDirectories = directories.map((d) =>
    d.split("/").filter((a) => a?.length > 0)
  );
  const getUniqueLevel = (
    split: string[][],
    prevRoot?: string
  ): NotOptimizedList[] => {
    const uniqueBase = [
      ...new Set(
        split.filter((a) => a.length > 0).map((dirParts) => dirParts[0])
      ),
    ];

    const branches = uniqueBase.map((root) => {
      const validSplits = split
        .filter((b) => b[0] === root)
        .map((a) => a.slice(1));
      const absRoot = [prevRoot, root].filter((a) => a).join("/");
      const newBranches = validSplits.length
        ? getUniqueLevel(validSplits, absRoot)
        : [];
      let tree: NotOptimizedList = {
        root,
        absRoot,
        isLeafRoot:
          validSplits.some((a) => !a.length) &&
          validSplits.some((a) => a.length),
      };
      if (newBranches.length) {
        tree.branches = newBranches;
      }
      return tree;
    });
    return branches.map((branch) => {
      if (!branch.isLeafRoot && branch.branches?.every((b) => b.isLeafRoot)) {
        branch.root += "/" + branch.branches[0].root;
        branch.absRoot += "/" + branch.branches[0].root;
        branch.branches = branch.branches[0].branches ?? [];
        branch.isLeafRoot = true;
      }
      return branch;
    });
  };
  const trees = getUniqueLevel(splitDirectories) as Tree[];
  return trees.map((b) => removeKeys(b, ["isLeafRoot"]) as Tree);
};
