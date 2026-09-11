import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn() utility", () => {
  it("returns a single class unchanged", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("merges multiple class strings", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("filters out falsy values (undefined, false, null)", () => {
    expect(cn("a", undefined, false, null, "b")).toBe("a b");
  });

  it("deduplicates Tailwind conflicting classes (last wins)", () => {
    // tailwind-merge should resolve p-4 vs p-8 -> p-8
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("merges Tailwind color classes correctly", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles conditional classes via clsx object syntax", () => {
    expect(cn({ "text-primary": true, "text-secondary": false })).toBe("text-primary");
  });

  it("handles array inputs", () => {
    expect(cn(["a", "b"], "c")).toBe("a b c");
  });

  it("returns empty string for no arguments", () => {
    expect(cn()).toBe("");
  });

  it("handles complex Tailwind modifier merges", () => {
    // hover variants should not conflict
    expect(cn("hover:bg-red-500", "hover:bg-blue-500")).toBe("hover:bg-blue-500");
  });
});
