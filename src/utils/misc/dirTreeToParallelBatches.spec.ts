import { dirTreeToParallelBatches } from "./dirTreeToParallelBatches";
import { getDirTree, Tree } from "./getDirTree";

describe("dirTreeToParallelBatches", () => {
  const tree1: Tree = {
    root: "root1",
    absRoot: "root1",
    branches: [
      {
        root: "dir1",
        absRoot: "root1/dir1",
        branches: [
          {
            absRoot: "root1/dir1/subdir1",
            root: "subdir1",
          },
          {
            absRoot: "root1/dir1/subdir2",
            root: "subdir2",
            branches: [
              {
                absRoot: "root1/dir1/subdir2/subsubdir1",
                root: "subsubdir1",
              },
            ],
          },
        ],
      },
      {
        absRoot: "root1/dir2",
        root: "dir2",
      },
    ],
  };

  const tree2: Tree = {
    root: "root2",
    absRoot: "root2",
    branches: [
      {
        absRoot: "root2/dir3",
        root: "dir3",
      },
    ],
  };

  const tree3: Tree = {
    root: "root3",
    absRoot: "root3",
  };

  it("should return empty array for empty input", () => {
    const input: Tree[] = [];
    const expected: string[][] = [];
    expect(dirTreeToParallelBatches(input)).toEqual(expected);
  });

  it("should return a single batch for a tree with no branches", () => {
    const input: Tree[] = [tree3];
    const expected: string[][] = [["root3"]];
    expect(dirTreeToParallelBatches(input)).toEqual(expected);
  });

  it("should return batches for a tree with branches", () => {
    const input: Tree[] = [tree1, tree2];
    const expected: string[][] = [
      ["root1/dir1/subdir2/subsubdir1"],
      ["root1/dir1/subdir1", "root1/dir1/subdir2"],
      ["root1/dir1", "root1/dir2", "root2/dir3"],
      ["root1", "root2"],
    ];
    expect(dirTreeToParallelBatches(input)).toEqual(expected);
  });
  it("should handle multiple trees with multiple branches and sub-branches", () => {
    const tree1: Tree = {
      root: "root1",
      absRoot: "root1",
      branches: [
        {
          root: "dir1",
          absRoot: "root1/dir1",
          branches: [
            {
              root: "subdir1",
              absRoot: "root1/dir1/subdir1",
            },
            {
              root: "subdir2",
              absRoot: "root1/dir1/subdir2",
              branches: [
                {
                  root: "subsubdir1",
                  absRoot: "root1/dir1/subdir2/subsubdir1",
                },
              ],
            },
          ],
        },
        {
          root: "dir2",
          absRoot: "root1/dir2",
        },
      ],
    };

    const tree2: Tree = {
      root: "root2",
      absRoot: "root2",
      branches: [
        {
          absRoot: "root2/dir3",
          root: "dir3",
        },
        {
          root: "dir4",
          absRoot: "root2/dir4",
          branches: [
            {
              absRoot: "root2/dir4/subdir3",
              root: "subdir3",
            },
          ],
        },
      ],
    };

    const input: Tree[] = [tree1, tree2];
    const expected: string[][] = [
      ["root1/dir1/subdir2/subsubdir1"],
      ["root1/dir1/subdir1", "root1/dir1/subdir2", "root2/dir4/subdir3"],
      ["root1/dir1", "root1/dir2", "root2/dir3", "root2/dir4"],
      ["root1", "root2"],
    ];

    expect(dirTreeToParallelBatches(input)).toEqual(expected);
  });

  it("should handle multiple trees with the same root directory", () => {
    const tree1: Tree = {
      root: "root",
      absRoot: "root",
      branches: [
        {
          root: "dir1",
          absRoot: "root/dir1",
          branches: [
            {
              absRoot: "root/dir1/subdir1",
              root: "subdir1",
            },
          ],
        },
      ],
    };

    const tree2: Tree = {
      root: "root",
      absRoot: "root",
      branches: [
        {
          absRoot: "root/dir2",
          root: "dir2",
          branches: [
            {
              absRoot: "root/dir2/subdir2",
              root: "subdir2",
            },
          ],
        },
      ],
    };

    const input: Tree[] = [tree1, tree2];
    const expected: string[][] = [
      ["root/dir1/subdir1", "root/dir2/subdir2"],
      ["root/dir1", "root/dir2"],
      ["root"],
    ];

    expect(dirTreeToParallelBatches(input)).toEqual(expected);
  });
  it("should return batches with correct order and absolute paths for a complex tree", () => {
    const tree1: Tree = {
      root: "root1",
      absRoot: "root1",
      branches: [
        {
          absRoot: "root1/dir1",
          root: "dir1",
          branches: [
            {
              absRoot: "root1/dir1/subdir1",
              root: "subdir1",
            },
            {
              absRoot: "root1/dir1/subdir2",
              root: "subdir2",
              branches: [
                {
                  absRoot: "root1/dir1/subdir2/subsubdir1",
                  root: "subsubdir1",
                },
              ],
            },
          ],
        },
        {
          absRoot: "root1/dir2",
          root: "dir2",
        },
      ],
    };

    const tree2: Tree = {
      root: "root2",
      absRoot: "root2",
      branches: [
        {
          root: "dir3",
          absRoot: "root2/dir3",
          branches: [
            {
              root: "subdir3",
              absRoot: "root2/dir3/subdir3",
              branches: [
                {
                  root: "subsubdir2",
                  absRoot: "root2/dir3/subdir3/subsubdir2",
                },
                {
                  root: "subsubdir3",
                  absRoot: "root2/dir3/subdir3/subsubdir3",
                },
              ],
            },
          ],
        },
      ],
    };

    const input: Tree[] = [tree1, tree2];
    const expected: string[][] = [
      [
        "root1/dir1/subdir2/subsubdir1",
        "root2/dir3/subdir3/subsubdir2",
        "root2/dir3/subdir3/subsubdir3",
      ],
      ["root1/dir1/subdir1", "root1/dir1/subdir2", "root2/dir3/subdir3"],
      ["root1/dir1", "root1/dir2", "root2/dir3"],
      ["root1", "root2"],
    ];
    expect(dirTreeToParallelBatches(input)).toEqual(expected);
  });

  it("should handle input with multiple top-level directories", () => {
    const tree1: Tree = {
      root: "root1",
      absRoot: "root1",
      branches: [
        {
          root: "dir1",
          absRoot: "root1/dir1",
        },
      ],
    };

    const tree2: Tree = {
      root: "root2",
      absRoot: "root2",
      branches: [
        {
          root: "dir2",
          absRoot: "root2/dir2",
        },
      ],
    };

    const input: Tree[] = [tree1, tree2];
    const expected: string[][] = [
      ["root1/dir1", "root2/dir2"],
      ["root1", "root2"],
    ];
    expect(dirTreeToParallelBatches(input)).toEqual(expected);
  });
  it("should handle example data directories", () => {
    const input: Tree[] = [
      {
        root: "test-tmp",
        absRoot: "test-tmp",
        branches: [
          {
            root: "_next",
            absRoot: "test-tmp/_next",
            branches: [
              {
                root: "Z46acXX3r7SnuMFVGyI0B",
                absRoot: "test-tmp/_next/Z46acXX3r7SnuMFVGyI0B",
              },
              {
                root: "data",
                absRoot: "test-tmp/_next/data",
                branches: [
                  {
                    root: "Z46acXX3r7SnuMFVGyI0B",
                    absRoot: "test-tmp/_next/data/Z46acXX3r7SnuMFVGyI0B",
                    branches: [
                      {
                        absRoot:
                          "test-tmp/_next/data/Z46acXX3r7SnuMFVGyI0B/blog",
                        root: "blog",
                      },
                      {
                        root: "es",
                        absRoot: "test-tmp/_next/data/Z46acXX3r7SnuMFVGyI0B/es",
                        branches: [
                          {
                            root: "blog",
                            absRoot:
                              "test-tmp/_next/data/Z46acXX3r7SnuMFVGyI0B/es/blog",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                root: "static",
                absRoot: "test-tmp/_next/static",
                branches: [
                  {
                    root: "Z46acXX3r7SnuMFVGyI0B",
                    absRoot: "test-tmp/_next/static/Z46acXX3r7SnuMFVGyI0B",
                  },
                  {
                    root: "chunks",
                    absRoot: "test-tmp/_next/static/chunks",
                    branches: [
                      {
                        root: "pages",
                        absRoot: "test-tmp/_next/static/chunks/pages",
                        branches: [
                          {
                            root: "[locale]",
                            absRoot:
                              "test-tmp/_next/static/chunks/pages/[locale]",
                          },
                          {
                            root: "blog",
                            absRoot: "test-tmp/_next/static/chunks/pages/blog",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    absRoot: "test-tmp/_next/static/css",
                    root: "css",
                  },
                  {
                    absRoot: "test-tmp/_next/static/media",
                    root: "media",
                  },
                ],
              },
            ],
          },
          {
            absRoot: "test-tmp/blog",
            root: "blog",
          },
          {
            root: "es",
            absRoot: "test-tmp/es",
            branches: [
              {
                absRoot: "test-tmp/es/blog",
                root: "blog",
              },
            ],
          },
          {
            absRoot: "test-tmp/favicons",
            root: "favicons",
          },
          {
            absRoot: "test-tmp/locales",
            root: "locales",
            branches: [
              {
                absRoot: "test-tmp/locales/en",
                root: "en",
              },
              {
                absRoot: "test-tmp/locales/es",
                root: "es",
              },
            ],
          },
          {
            absRoot: "test-tmp/nextImageExportOptimizer",
            root: "nextImageExportOptimizer",
          },
        ],
      },
    ];
    const output = dirTreeToParallelBatches(input);
    const expectedOutput: string[][] = [
      [
        "test-tmp/_next/data/Z46acXX3r7SnuMFVGyI0B/es/blog",
        "test-tmp/_next/static/chunks/pages/[locale]",
        "test-tmp/_next/static/chunks/pages/blog",
      ],
      [
        "test-tmp/_next/data/Z46acXX3r7SnuMFVGyI0B/blog",
        "test-tmp/_next/data/Z46acXX3r7SnuMFVGyI0B/es",
        "test-tmp/_next/static/chunks/pages",
      ],
      [
        "test-tmp/_next/data/Z46acXX3r7SnuMFVGyI0B",
        "test-tmp/_next/static/Z46acXX3r7SnuMFVGyI0B",
        "test-tmp/_next/static/chunks",
        "test-tmp/_next/static/css",
        "test-tmp/_next/static/media",
      ],
      [
        "test-tmp/_next/Z46acXX3r7SnuMFVGyI0B",
        "test-tmp/_next/data",
        "test-tmp/_next/static",
        "test-tmp/es/blog",
        "test-tmp/locales/en",
        "test-tmp/locales/es",
      ],
      [
        "test-tmp/_next",
        "test-tmp/blog",
        "test-tmp/es",
        "test-tmp/favicons",
        "test-tmp/locales",
        "test-tmp/nextImageExportOptimizer",
      ],
      ["test-tmp"],
    ];
    expect(output).toEqual(expectedOutput);
  });
});
