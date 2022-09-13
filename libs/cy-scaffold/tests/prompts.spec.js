import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "cli-testing-library";

const __dirname = dirname(fileURLToPath(import.meta.url));

test("renders the What do you want? prompt", async () => {
  const { findByText } = await render("node", [
    resolve(__dirname, "../src/lib/cli.js"),
  ]);

  expect(await findByText("What do you want?")).toBeInTheConsole();
});

test("the Spec Scaffold prompt renders the correct options", async () => {
  const { findByText, userEvent } = await render("node", [
    resolve(__dirname, "../src/lib/cli.js"),
  ]);

  expect(await findByText("What do you want?")).toBeInTheConsole();

  userEvent.keyboard("[Enter]");

  expect(await findByText("Empty Spec Boilerplate")).toBeInTheConsole();
  expect(await findByText("Login Form Spec")).toBeInTheConsole();
  expect(await findByText("API Spec")).toBeInTheConsole();
  expect(
    await findByText("Network Spec - uses cy.intercept()")
  ).toBeInTheConsole();
});

test("the Example Spec prompt renders the correct options", async () => {
  const { findByText, userEvent } = await render("node", [
    resolve(__dirname, "../src/lib/cli.js"),
  ]);

  expect(await findByText("What do you want?")).toBeInTheConsole();

  userEvent.keyboard("[ArrowDown]");

  userEvent.keyboard("[Enter]");

  expect(await findByText("Login Form Spec")).toBeInTheConsole();
  expect(await findByText("API Spec")).toBeInTheConsole();
  expect(
    await findByText("Network Spec - uses cy.intercept()")
  ).toBeInTheConsole();
  expect(await findByText("localStorage")).toBeInTheConsole();
});

test("the Custom Command prompt renders the correct options", async () => {
  const { findByText, userEvent } = await render("node", [
    resolve(__dirname, "../src/lib/cli.js"),
  ]);

  expect(await findByText("What do you want?")).toBeInTheConsole();

  userEvent.keyboard("[ArrowDown]");
  userEvent.keyboard("[ArrowDown]");

  userEvent.keyboard("[Enter]");

  expect(await findByText("Login")).toBeInTheConsole();
  expect(await findByText("localStorage")).toBeInTheConsole();
});
