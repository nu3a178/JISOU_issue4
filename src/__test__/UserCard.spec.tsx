// @vitest-environment jsdom
/// <reference types="@testing-library/jest-dom" />
import { act, cleanup, render, screen } from "@testing-library/react";
import { expect, test, beforeEach, afterEach, vi } from "vitest";
import { Provider } from "../components/ui/provider";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserCard } from "../pages/UserCard";
import { getUser, getUserSkills } from "../utils/supabase";

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
    getUser: vi.fn().mockReturnValue({
      id: "test",
      name: "モック太郎",
      description: "<h1>モックの自己紹介</h1>",
      githubId: "mockgit",
      qiitaId: "mockqiita",
      xId: "mockx",
      githubUrl: "https://github.com/mockgit",
      qiitaUrl: "https://qiita.com/mockqiita",
      xUrl: "https://x.com/mockx",
    }),
    getUserSkills: vi.fn().mockReturnValue([
      {
        id: 1,
        name: "React",
      },
    ]),
    registerUser: vi.fn(),
  };
});
beforeEach(() => {
  render(
    <Provider>
      <MemoryRouter initialEntries={["/cards/test"]}>
        <Routes>
          <Route path="/cards/:id" element={<UserCard />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
});

afterEach(() => {
  cleanup();
});

test("初期表示でapiが呼ばれていること", async () => {
  expect(getUser).toHaveBeenCalled();
  expect(getUserSkills).toHaveBeenCalled();
});

test("名前が表示されていること", async () => {
  const name = await screen.findByTestId("name");
  expect(getUser).toHaveBeenCalled();
  expect(name).toHaveTextContent("モック太郎");
});

test("自己紹介が表示されていること", async () => {
  const description = await screen.findByText("モックの自己紹介");
  expect(description).toHaveTextContent("モックの自己紹介");
});

test("技術が表示されていること", async () => {
  const skill = await screen.findByTestId("skill");
  expect(skill).toHaveTextContent("React");
});

test("githubアイコンが表示されていること", async () => {
  const githubLink = await screen.findByTestId("github-link");
  const githubIcon = githubLink.querySelector("img");
  expect(githubIcon).toHaveAttribute("src");
  expect(githubLink).toHaveAttribute("href", "https://github.com/mockgit");
});

test("qiitaアイコンが表示されていること", async () => {
  const qiitaLink = await screen.findByTestId("qiita-link");
  const qiitaIcon = qiitaLink.querySelector("img");
  expect(qiitaIcon).toHaveAttribute("src", "/src/assets/qiita.png");
  expect(qiitaLink).toHaveAttribute("href", "https://qiita.com/mockqiita");
});

test("xアイコンが表示されていること", async () => {
  const xLink = await screen.findByTestId("x-link");
  const xIcon = xLink.querySelector("img");
  expect(xIcon).toHaveAttribute("src", "/src/assets/x.png");
  expect(xLink).toHaveAttribute("href", "https://x.com/mockx");
});

test("ホーム画面に戻れること", async () => {
  const backButton = await screen.findByTestId("back-button");
  act(() => {
    backButton.click();
  });
  expect(mockNavigate).toHaveBeenCalledWith("/");
});
