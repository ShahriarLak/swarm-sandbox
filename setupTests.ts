import "@testing-library/jest-dom/vitest";
import type { ComponentProps } from "react";
import React from "react";
import { vi } from "vitest";

// Provide a minimal Next.js Link mock for component tests.
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: ComponentProps<"a"> & { href: string }) =>
    React.createElement("a", { href, ...props }, children),
}));
