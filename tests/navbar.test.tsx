import { render, screen } from "@testing-library/react";

import { Navbar } from "@/components/ui/navbar";

describe("Navbar", () => {
  it("renders dashboard link", () => {
    render(<Navbar />);

    const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");
  });
});
