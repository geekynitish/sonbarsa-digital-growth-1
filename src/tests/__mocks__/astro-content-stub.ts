// Stub for astro:content virtual module — only used during Vitest test runs.
// getCollection is mocked per-test-file where needed via vi.mock("astro:content").
export const getCollection = () => Promise.resolve([]);
export const getEntry = () => Promise.resolve(null);
export const getEntries = () => Promise.resolve([]);
export const reference = (collection: string) => collection;
export const z = {};
export const defineCollection = (config: unknown) => config;
