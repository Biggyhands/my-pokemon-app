import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  const mockOnResetForm = jest.fn();
  const mockFormHandler = {
    formState: { searchInput: "" },
    onInputChange: jest.fn(),
    onResetForm: mockOnResetForm,
  };

  test("renders an input with a string placeholder", () => {
    render(<SearchBar formHandler={mockFormHandler} />);

    const inputElement = screen.getByRole("textbox");
    expect(typeof inputElement.placeholder).toBe("string");
  });

  test("renders a button and calls onResetForm when clicked", () => {
    render(<SearchBar formHandler={mockFormHandler} />);

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(mockOnResetForm).toHaveBeenCalled();
  });
});
