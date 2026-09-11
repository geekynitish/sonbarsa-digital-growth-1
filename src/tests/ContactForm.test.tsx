import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/contact/ContactForm";

// Mock the toast hook
const mockToast = vi.fn();
vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: mockToast }),
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Service Interested In/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Message/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /Send Message/i })).toBeInTheDocument();
  });

  it("includes new AI service options", () => {
    render(<ContactForm />);
    const select = screen.getByLabelText(/Service Interested In/i);
    expect(select).toContainHTML("AI &amp; Machine Learning");
    expect(select).toContainHTML("Generative AI");
    expect(select).toContainHTML("Data Analytics");
  });

  it("updates form data when user types in name field", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/Your Name/i);
    await user.type(nameInput, "Rajesh Kumar");
    expect(nameInput).toHaveValue("Rajesh Kumar");
  });

  it("updates form data when user types in email field", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    await user.type(emailInput, "test@example.com");
    expect(emailInput).toHaveValue("test@example.com");
  });

  it("shows 'Sending...' text on the button while submitting", async () => {
    // Slow fetch that never resolves
    mockFetch.mockImplementation(() => new Promise(() => {}));
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Your Name/i), "Test User");
    await user.type(screen.getByLabelText(/Email Address/i), "test@example.com");
    await user.type(screen.getByLabelText(/Your Message/i), "Hello there");

    const submitButton = screen.getByRole("button", { name: /Send Message/i });
    await user.click(submitButton);

    expect(screen.getByRole("button", { name: /Sending/i })).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows success toast on successful form submission", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Your Name/i), "Test User");
    await user.type(screen.getByLabelText(/Email Address/i), "test@example.com");
    await user.type(screen.getByLabelText(/Your Message/i), "Hello there");

    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: expect.stringContaining("Sent") })
      );
    });
  });

  it("shows error toast on failed form submission", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Server error" }),
    });
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Your Name/i), "Test User");
    await user.type(screen.getByLabelText(/Email Address/i), "test@example.com");
    await user.type(screen.getByLabelText(/Your Message/i), "Hello there");

    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ variant: "destructive" })
      );
    });
  });

  it("shows error toast on network error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Your Name/i), "Test User");
    await user.type(screen.getByLabelText(/Email Address/i), "test@example.com");
    await user.type(screen.getByLabelText(/Your Message/i), "Hello");

    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Network error" })
      );
    });
  });

  it("clears form fields after successful submission", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/Your Name/i);
    await user.type(nameInput, "Test User");
    await user.type(screen.getByLabelText(/Email Address/i), "test@example.com");
    await user.type(screen.getByLabelText(/Your Message/i), "Hello there");

    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    await waitFor(() => {
      expect(nameInput).toHaveValue("");
    });
  });

  it("sends form data to the correct endpoint", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Your Name/i), "Test User");
    await user.type(screen.getByLabelText(/Email Address/i), "test@example.com");
    await user.type(screen.getByLabelText(/Your Message/i), "Test message");

    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            name: "Test User",
            email: "test@example.com",
            message: "Test message",
          }),
        })
      );
    });
  });
});
