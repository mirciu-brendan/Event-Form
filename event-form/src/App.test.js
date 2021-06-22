import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import axios from 'axios';

const mockForm = jest.fn((firstName, lastName, email, date) => {
  return Promise.resolve({ firstName, lastName, email, date });
});

describe("App", () => {
  beforeEach(() => {
    render(<App login={mockForm} />);
  });
  
  it("should display required error when inputs are empty", async () => {
    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(4); // 4 alerts for 4 inputs
    expect(mockForm).not.toBeCalled();
  });
  it("should display matching error when first name is invalid", async () => {
    fireEvent.input(screen.getByPlaceholderText("First name"), {target: {value: "Jan345"}});
    fireEvent.input(screen.getByPlaceholderText("Last name"), {target: {value: "Kowalski"}});
    fireEvent.input(screen.getByPlaceholderText("Email"), {target: {value: "test@test.com"}});
    fireEvent.input(screen.getByPlaceholderText("Date"), {target: {value: "2021-07-25"}});

    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockForm).not.toBeCalled();
  });
  it("should display matching error when last name is invalid", async () => {
    fireEvent.input(screen.getByPlaceholderText("First name"), {target: {value: "Jan"}});
    fireEvent.input(screen.getByPlaceholderText("Last name"), {target: {value: "Kowalski$%@456"}});
    fireEvent.input(screen.getByPlaceholderText("Email"), {target: {value: "testtest@test.com"}});
    fireEvent.input(screen.getByPlaceholderText("Date"), {target: {value: "2021-07-25"}});

    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockForm).not.toBeCalled();
  });
  it("should display matching error when email is invalid", async () => {
    fireEvent.input(screen.getByPlaceholderText("First name"), {target: {value: "Jan"}});
    fireEvent.input(screen.getByPlaceholderText("Last name"), {target: {value: "Kowalski"}});
    fireEvent.input(screen.getByPlaceholderText("Email"), {target: {value: "test"}});
    fireEvent.input(screen.getByPlaceholderText("Date"), {target: {value: "2021-07-25"}});

    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockForm).not.toBeCalled();
  });
  it("should display matching error when date is invalid (past date)", async () => {
    fireEvent.input(screen.getByPlaceholderText("First name"), {target: {value: "Jan"}});
    fireEvent.input(screen.getByPlaceholderText("Last name"), {target: {value: "Kowalski"}});
    fireEvent.input(screen.getByPlaceholderText("Email"), {target: {value: "test@test.com"}});
    fireEvent.input(screen.getByPlaceholderText("Date"), {target: {value: "2021-01-01"}});

    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockForm).not.toBeCalled();
  });
  it("should not display error when value is valid", async () => {
    fireEvent.input(screen.getByPlaceholderText("First name"), {target: {value: "Jan"}});
    fireEvent.input(screen.getByPlaceholderText("Last name"), {target: {value: "Kowalski"}});
    fireEvent.input(screen.getByPlaceholderText("Email"), {target: {value: "test@test.com"}});
    fireEvent.input(screen.getByPlaceholderText("Date"), {target: {value: "2021-08-01"}});


    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    expect(mockForm).toBeCalledWith("Jan", "Kowalski", "test@test.com", "2021-08-01");
    
  });
  it("test axios request", async () => {
    fireEvent.input(screen.getByPlaceholderText("First name"), {target: {value: "Jan"}});
    fireEvent.input(screen.getByPlaceholderText("Last name"), {target: {value: "Kowalski"}});
    fireEvent.input(screen.getByPlaceholderText("Email"), {target: {value: "test@test.com"}});
    fireEvent.input(screen.getByPlaceholderText("Date"), {target: {value: "2021-08-01"}});


    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    expect(axios.post()).toHaveBeenCalledTimes(1);
    
  });
});

