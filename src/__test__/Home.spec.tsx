// @vitest-environment jsdom
/// <reference types="@testing-library/jest-dom" />
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, beforeEach, afterEach, vi } from "vitest";
import { Provider } from "../components/ui/provider";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
vi.mock("../utils/supabase", async () => {
  return {
    getUserSkills: vi.fn().mockReturnValue([
      {
        id: 1,
        name: "React",
      },
    ]),
    registerUser: vi.fn().mockResolvedValue(undefined),
  };
});
beforeEach(() => {
  render(
    <Provider>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
});

afterEach(() => {
  cleanup();
});

test("タイトルが表示されていることのテスト", async () => {
  const title = await screen.findByRole("heading", { level: 1 });
  expect(title).toBeInTheDocument();
});

test("id入力でページ遷移されることのテスト", async () => {
  const user = userEvent.setup();
  const input = await screen.findByTestId("input");
  await user.type(input, "123");
  await user.click(screen.getByTestId("submit"));
  expect(mockNavigate).toHaveBeenCalledWith("/cards/123");
});

test("id未入力でエラーが表示されることのテスト", async () => {
  const user = userEvent.setup();
  await user.click(screen.getByTestId("submit"));
  expect(await screen.findByText("IDを入力してください")).toBeInTheDocument();
});

test("新規登録ボタンを押すと登録画面に遷移することのテスト", async () => {
  const user = userEvent.setup();
  await user.click(screen.getByTestId("to-register"));
  expect(mockNavigate).toHaveBeenCalledWith("/cards/register");
});
