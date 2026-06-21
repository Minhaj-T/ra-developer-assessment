import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import EnquireModal from "./EnquireModal";

const supabaseMocks = vi.hoisted(() => ({
  from: vi.fn(),
  insert: vi.fn(),
}));

vi.mock("@/lib/supabase/client", () => ({
  supabase: {
    from: supabaseMocks.from,
  },
}));

const packageName = "China Highlights Tour";

function openEnquiryModal() {
  render(<EnquireModal packageName={packageName} />);
  fireEvent.click(screen.getByRole("button", { name: /book now/i }));
}

describe("EnquireModal", () => {
  beforeEach(() => {
    supabaseMocks.insert.mockReset();
    supabaseMocks.from.mockReset();
    supabaseMocks.insert.mockResolvedValue({ error: null });
    supabaseMocks.from.mockReturnValue({ insert: supabaseMocks.insert });
  });

  it("opens an enquiry form for the selected package", () => {
    openEnquiryModal();

    expect(screen.getByRole("dialog").hasAttribute("open")).toBe(true);
    expect(screen.getByRole("heading", { name: packageName })).toBeTruthy();
  });

  it("shows validation errors and blocks an invalid submission", async () => {
    openEnquiryModal();
    fireEvent.click(screen.getByRole("button", { name: /submit enquiry/i }));

    expect(await screen.findByText(/at least 2 characters/i)).toBeTruthy();
    expect(screen.getByText(/valid email address/i)).toBeTruthy();
    expect(screen.getByText(/7 to 15 digits/i)).toBeTruthy();
    expect(supabaseMocks.insert).not.toHaveBeenCalled();
  });

  it("submits valid enquiry data to Supabase", async () => {
    openEnquiryModal();

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Minhaj T" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "minhaj@example.com" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "+971 50 123 4567" } });
    fireEvent.click(screen.getByRole("button", { name: /submit enquiry/i }));

    await waitFor(() => {
      expect(supabaseMocks.insert).toHaveBeenCalledWith({
        email: "minhaj@example.com",
        name: "Minhaj T",
        package: packageName,
        phone: "+971 50 123 4567",
      });
    });

    expect(supabaseMocks.from).toHaveBeenCalledWith("enquiries");
    expect(await screen.findByText(/enquiry has been submitted/i)).toBeTruthy();
  });
});
