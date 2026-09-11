import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLocation } from "@/lib/router-shim";

// Note: Link and NavLink are React components tested separately in the React tests.
// This file tests the pure-TS helpers: useLocation and Navigate.

describe("useLocation()", () => {
  beforeEach(() => {
    // Reset window.location before each test
    // jsdom provides window.location as a real object
    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        pathname: "/test",
        search: "?q=hello",
        hash: "#section",
        href: "http://localhost/test?q=hello#section",
        assign: vi.fn(),
        replace: vi.fn(),
      },
    });
  });

  it("returns the current pathname from window.location", () => {
    const location = useLocation();
    expect(location.pathname).toBe("/test");
  });

  it("returns the search string", () => {
    const location = useLocation();
    expect(location.search).toBe("?q=hello");
  });

  it("returns the hash", () => {
    const location = useLocation();
    expect(location.hash).toBe("#section");
  });

  it("returns { pathname: '/', search: '', hash: '' } on server (window undefined)", () => {
    // Simulate server-side by temporarily removing window
    const originalWindow = global.window;
    // @ts-expect-error — simulating SSR
    delete global.window;

    const location = useLocation();
    expect(location.pathname).toBe("/");
    expect(location.search).toBe("");
    expect(location.hash).toBe("");

    global.window = originalWindow;
  });
});
