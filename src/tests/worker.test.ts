import { describe, it, expect, vi } from "vitest";
import worker from "../../worker.js";

describe("Cloudflare Worker (worker.js)", () => {
  const createMockEnv = (d1Results: Record<string, unknown>[] = []) => {
    const mockRun = vi.fn().mockResolvedValue({ success: true });
    const mockAll = vi.fn().mockResolvedValue({ results: d1Results });
    const mockBind = vi.fn().mockReturnValue({ run: mockRun, all: mockAll });
    const mockPrepare = vi.fn().mockReturnValue({ bind: mockBind, all: mockAll, run: mockRun });

    return {
      DB: {
        prepare: mockPrepare,
        _mockRun: mockRun,
        _mockAll: mockAll,
        _mockBind: mockBind,
        _mockPrepare: mockPrepare,
      },
      ASSETS: {
        fetch: vi.fn().mockResolvedValue(new Response("Asset response", { status: 200 })),
      },
    };
  };

  describe("Domain canonicalization", () => {
    it("redirects www.sonbarsa.com to sonbarsa.com with 301", async () => {
      const request = new Request("https://www.sonbarsa.com/services", {
        headers: { host: "www.sonbarsa.com" },
      });
      const env = createMockEnv();

      const response = await worker.fetch(request, env);
      expect(response.status).toBe(301);
      expect(response.headers.get("location")).toBe("https://sonbarsa.com/services");
    });
  });

  describe("Asset fetching fallback", () => {
    it("delegates normal page requests to env.ASSETS.fetch", async () => {
      const request = new Request("https://sonbarsa.com/about", {
        headers: { host: "sonbarsa.com" },
      });
      const env = createMockEnv();

      const response = await worker.fetch(request, env);
      expect(env.ASSETS.fetch).toHaveBeenCalledWith(request);
      expect(response.status).toBe(200);
    });
  });

  describe("OPTIONS /api/contact", () => {
    it("returns 204 with CORS headers", async () => {
      const request = new Request("https://sonbarsa.com/api/contact", {
        method: "OPTIONS",
      });
      const env = createMockEnv();

      const response = await worker.fetch(request, env);
      expect(response.status).toBe(204);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Access-Control-Allow-Methods")).toContain("POST");
    });
  });

  describe("POST /api/contact validation", () => {
    it("rejects non-JSON payloads", async () => {
      const request = new Request("https://sonbarsa.com/api/contact", {
        method: "POST",
        body: "invalid-json",
      });
      const env = createMockEnv();

      const response = await worker.fetch(request, env);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toMatch(/Invalid JSON/i);
    });

    it("requires a non-empty name", async () => {
      const request = new Request("https://sonbarsa.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com", message: "Hello" }),
      });
      const env = createMockEnv();

      const response = await worker.fetch(request, env);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toMatch(/Name is required/i);
    });

    it("requires a valid email address", async () => {
      const request = new Request("https://sonbarsa.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "John Doe", email: "invalid-email", message: "Hello" }),
      });
      const env = createMockEnv();

      const response = await worker.fetch(request, env);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toMatch(/valid email/i);
    });

    it("requires a non-empty message", async () => {
      const request = new Request("https://sonbarsa.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "John Doe", email: "john@example.com", message: "   " }),
      });
      const env = createMockEnv();

      const response = await worker.fetch(request, env);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toMatch(/Message is required/i);
    });
  });

  describe("POST /api/contact with D1 database", () => {
    it("successfully inserts inquiry into D1", async () => {
      const request = new Request("https://sonbarsa.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Anita Sharma",
          email: "anita@sharma.in",
          phone: "+91 98765 43210",
          company: "Sharma Tech",
          service: "ai-ml",
          message: "Interested in AI consulting.",
        }),
      });
      const env = createMockEnv();

      const response = await worker.fetch(request, env);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(env.DB.prepare).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO contacts"));
      expect(env.DB._mockBind).toHaveBeenCalledWith(
        "Anita Sharma",
        "anita@sharma.in",
        "+91 98765 43210",
        "Sharma Tech",
        "ai-ml",
        "Interested in AI consulting."
      );
    });

    it("returns 500 when D1 database fails", async () => {
      const request = new Request("https://sonbarsa.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Anita Sharma",
          email: "anita@sharma.in",
          message: "Interested in AI consulting.",
        }),
      });
      const env = createMockEnv();
      env.DB._mockRun.mockRejectedValueOnce(new Error("D1 internal error"));

      const response = await worker.fetch(request, env);
      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data.success).toBe(false);
    });

    it("handles gracefully when D1 DB binding is absent", async () => {
      const request = new Request("https://sonbarsa.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Anita Sharma",
          email: "anita@sharma.in",
          message: "Interested in AI consulting.",
        }),
      });
      const env = { ASSETS: { fetch: vi.fn() } };

      const response = await worker.fetch(request, env);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });
  });

  describe("GET /api/contact", () => {
    it("returns leads list from D1", async () => {
      const mockLeads = [
        {
          id: 1,
          name: "Anita",
          email: "anita@example.com",
          message: "Hi",
          created_at: "2026-09-11 12:00:00",
        },
      ];
      const request = new Request("https://sonbarsa.com/api/contact", { method: "GET" });
      const env = createMockEnv(mockLeads);

      const response = await worker.fetch(request, env);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.count).toBe(1);
      expect(data.data[0].name).toBe("Anita");
    });

    it("returns empty array when env.DB is absent", async () => {
      const request = new Request("https://sonbarsa.com/api/contact", { method: "GET" });
      const env = { ASSETS: { fetch: vi.fn() } };

      const response = await worker.fetch(request, env);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.count).toBe(0);
      expect(data.data).toEqual([]);
    });
  });

  describe("GET /admin/leads", () => {
    it("serves HTML leads dashboard", async () => {
      const request = new Request("https://sonbarsa.com/admin/leads");
      const env = createMockEnv([
        {
          id: 1,
          name: "Test Lead",
          email: "lead@test.com",
          phone: "12345",
          company: "Corp",
          service: "ai-ml",
          message: "Please call back",
          created_at: "2026-09-11",
        },
      ]);

      const response = await worker.fetch(request, env);
      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toContain("text/html");
      const html = await response.text();
      expect(html).toContain("SonBarsa Leads Dashboard");
      expect(html).toContain("Test Lead");
      expect(html).toContain("lead@test.com");
    });
  });
});
