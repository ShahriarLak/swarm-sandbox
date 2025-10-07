import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FAQ } from "@/components/ui/faq";

const mockItems = [
  { question: "What is PulsePilot?", answer: "PulsePilot is a product ops platform." },
];

describe("FAQ", () => {
  it("toggles answers open and closed", async () => {
    const user = userEvent.setup();
    render(<FAQ items={mockItems} />);

    const questionButton = screen.getByRole("button", { name: /what is pulsepilot/i });
    const answer = screen.getByText(/product ops platform/i);

    expect(answer).toBeVisible();

    await user.click(questionButton);
    expect(answer).not.toBeVisible();

    await user.click(questionButton);
    expect(answer).toBeVisible();
  });
});
