import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders app correctly", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const container = screen.getByText(/Pokemon List/i);
  expect(container).toBeInTheDocument();
});
