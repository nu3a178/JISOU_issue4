// @vitest-environment jsdom
/// <reference types="@testing-library/jest-dom" />
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, beforeEach, afterEach, vi } from "vitest";
import { Provider } from "../components/ui/provider";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CardRegister } from "../pages/CardRegister";

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
      <MemoryRouter initialEntries={["/cards/register"]}>
        <Routes>
          <Route path="/cards/register" element={<CardRegister />} />
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

test("正常入力でカードが登録されることのテスト", async () => {
  const user = userEvent.setup();

  const id = await screen.findByTestId("id");
  const name = await screen.findByTestId("name");
  const description = await screen.findByTestId("description");
  const skillsTrigger = await screen.findByTestId("skills-trigger");
  const githubId = await screen.findByTestId("githubId");
  const qiitaId = await screen.findByTestId("qiitaId");
  const xId = await screen.findByTestId("xId");
  const registerButton = await screen.findByTestId("register");

  await user.type(id, "coffee");
  await user.type(name, "John Doe");
  await user.type(description, "Hello, I'm John!");
  await user.click(skillsTrigger);
  const skill1 = await screen.findByTestId("skill-1");
  await user.click(skill1);
  await user.type(githubId, "johnDoe");
  await user.type(qiitaId, "johnDoe");
  await user.type(xId, "johnDoe");
  await user.click(registerButton);
  expect(mockNavigate).toHaveBeenCalledWith("/");
});
const fillAllFields = async (user: ReturnType<typeof userEvent.setup>) => {
  const id = await screen.findByTestId("id");
  const name = await screen.findByTestId("name");
  const description = await screen.findByTestId("description");
  const skillsTrigger = await screen.findByTestId("skills-trigger");
  const githubId = await screen.findByTestId("githubId");
  const qiitaId = await screen.findByTestId("qiitaId");
  const xId = await screen.findByTestId("xId");

  await user.type(id, "coffee");
  await user.type(name, "John Doe");
  await user.type(description, "Hello, I'm John!");
  await user.click(skillsTrigger);
  const skill1 = await screen.findByTestId("skill-1");
  await user.click(skill1);
  await user.type(githubId, "johnDoe");
  await user.type(qiitaId, "johnDoe");
  await user.type(xId, "johnDoe");
};

test("好きな英単語が未入力の場合にエラーメッセージが表示されること", async () => {
  const user = userEvent.setup();
  await fillAllFields(user);
  const id = screen.getByTestId("id");
  await user.clear(id);
  await user.click(screen.getByTestId("register"));
  expect(
    await screen.findByText("英単語を入力してください"),
  ).toBeInTheDocument();
});

test("お名前が未入力の場合にエラーメッセージが表示されること", async () => {
  const user = userEvent.setup();
  await fillAllFields(user);
  const name = screen.getByTestId("name");
  await user.clear(name);
  await user.click(screen.getByTestId("register"));
  expect(
    await screen.findByText("お名前を入力してください"),
  ).toBeInTheDocument();
});

test("自己紹介が未入力の場合にエラーメッセージが表示されること", async () => {
  const user = userEvent.setup();
  await fillAllFields(user);
  const description = screen.getByTestId("description");
  await user.clear(description);
  await user.click(screen.getByTestId("register"));
  expect(
    await screen.findByText("自己紹介を入力してください"),
  ).toBeInTheDocument();
});

test("各外部サービスのIDが未入力の場合でも、登録ができること", async () => {
  const user = userEvent.setup();
  await fillAllFields(user);
  const githubId = screen.getByTestId("githubId");
  const qiitaId = screen.getByTestId("qiitaId");
  const xId = screen.getByTestId("xId");
  await user.clear(githubId);
  await user.clear(qiitaId);
  await user.clear(xId);
  await user.click(screen.getByTestId("register"));
  expect(mockNavigate).toHaveBeenCalledWith("/");
});
