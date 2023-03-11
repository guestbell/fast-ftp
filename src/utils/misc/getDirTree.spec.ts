import { getDirTree, Tree } from "./getDirTree";

describe("getDirTree", () => {
  it("should return an empty array when given an empty array", () => {
    const input: string[] = [];
    const output = getDirTree(input);
    expect(output).toEqual([]);
  });

  it("should correctly convert an array of directory paths to a tree structure", () => {
    const input = [
      "dir1",
      "dir1/subdir1",
      "dir1/subdir2",
      "dir2",
      "dir2/subdir1/subsubdir1",
      "dir2/subdir2",
      "dir3",
    ];
    const output = getDirTree(input);
    const expectedOutput: Tree[] = [
      {
        root: "dir1",
        absRoot: "dir1",
        branches: [
          { root: "subdir1", absRoot: "dir1/subdir1" },
          { root: "subdir2", absRoot: "dir1/subdir2" },
        ],
      },
      {
        root: "dir2",
        absRoot: "dir2",
        branches: [
          {
            root: "subdir1",
            absRoot: "dir2/subdir1",
            branches: [
              {
                root: "subsubdir1",
                absRoot: "dir2/subdir1/subsubdir1",
              },
            ],
          },
          {
            root: "subdir2",
            absRoot: "dir2/subdir2",
          },
        ],
      },
      {
        root: "dir3",
        absRoot: "dir3",
      },
    ];
    expect(output).toEqual(expectedOutput);
  });

  it("should correctly create shared root", () => {
    const input = [
      "dir1/subdir1",
      "dir1/subdir1/test/test2",
      "dir1/subdir1/test",
    ];
    const output = getDirTree(input);
    const expectedOutput: Tree[] = [
      {
        root: "dir1/subdir1",
        absRoot: "dir1/subdir1",
        branches: [
          {
            root: "test",
            absRoot: "dir1/subdir1/test",
            branches: [{ root: "test2", absRoot: "dir1/subdir1/test/test2" }],
          },
        ],
      },
    ];
    expect(output).toEqual(expectedOutput);
  });
  it("should handle example data directories", () => {
    const input = [
      "/test-tmp/_next",
      "/test-tmp/_next/Z46acXX3r7SnuMFVGyI0B",
      "/test-tmp/_next/data",
      "/test-tmp/_next/data/Z46acXX3r7SnuMFVGyI0B",
      "/test-tmp/_next/data/Z46acXX3r7SnuMFVGyI0B/blog",
      "/test-tmp/_next/data/Z46acXX3r7SnuMFVGyI0B/es",
      "/test-tmp/_next/data/Z46acXX3r7SnuMFVGyI0B/es/blog",
      "/test-tmp/_next/static",
      "/test-tmp/_next/static/Z46acXX3r7SnuMFVGyI0B",
      "/test-tmp/_next/static/chunks",
      "/test-tmp/_next/static/chunks/pages",
      "/test-tmp/_next/static/chunks/pages/[locale]",
      "/test-tmp/_next/static/chunks/pages/blog",
      "/test-tmp/_next/static/css",
      "/test-tmp/_next/static/media",
      "/test-tmp/blog",
      "/test-tmp/es",
      "/test-tmp/es/blog",
      "/test-tmp/favicons",
      "/test-tmp/locales",
      "/test-tmp/locales/en",
      "/test-tmp/locales/es",
      "/test-tmp/nextImageExportOptimizer",
    ];
    const output = getDirTree(input);
    const expectedOutput: Tree[] = [
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
    expect(output).toEqual(expectedOutput);
  });
});
