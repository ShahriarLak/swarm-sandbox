declare module "vitest" {
  type MockImplementation = (...args: unknown[]) => unknown;
  export const vi: {
    mock: (moduleName: string, factory: MockImplementation) => void;
  };
}
