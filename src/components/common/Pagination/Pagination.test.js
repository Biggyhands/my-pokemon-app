import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

test("calls onPreviousPage when Previous button is clicked", () => {
  const onPreviousPage = jest.fn();
  const onNextPage = jest.fn();
  const { getByText } = render(
    <Pagination
      page={1}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
    />
  );

  fireEvent.click(getByText("Previous"));
  expect(onPreviousPage).toHaveBeenCalled();
});

test("calls onNextPage when Next button is clicked", () => {
  const onPreviousPage = jest.fn();
  const onNextPage = jest.fn();
  const { getByText } = render(
    <Pagination
      page={1}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
    />
  );

  fireEvent.click(getByText("Next"));
  expect(onNextPage).toHaveBeenCalled();
});
