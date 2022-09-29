import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "cli-testing-library";
import { waitFor } from "cli-testing-library";
import * as fs from "node:fs";
import { getFileHelper } from "../utils/file-helper.js";
const { getFilePath } = getFileHelper();

const __dirname = dirname(fileURLToPath(import.meta.url));

test("the Login Form Spec example creates the correct file & contents", async () => {
  const expectedSpecFilePath = await getFilePath(
    resolve(
      __dirname,
      "../../../../node_modules/cli-testing-library/dist/cypress/integration/login.spec.js"
    )
  );

  // const expectedCommandFilePath = await getFilePath(
  //   resolve(
  //     __dirname,
  //     "../../../../node_modules/cli-testing-library/dist/cypress/support/commands.js"
  //   )
  // );

  const templateSpec = fs.readFileSync(
    resolve(__dirname, "../../src/lib/templates/examples/login.js"),
    "utf8"
  );

  // const templateCommand = fs.readFileSync(
  //   resolve(__dirname, "../../src/templates/commands/login.js"),
  //   "utf8"
  // );

  const { findByText, userEvent } = await render("node", [
    resolve(__dirname, "../../src/lib/cli.js"),
  ]);

  expect(await findByText("Example Spec")).toBeInTheConsole();
  userEvent.keyboard("[ArrowDown]");
  userEvent.keyboard("[Enter]");

  expect(await findByText("Login Form Spec")).toBeInTheConsole();
  userEvent.keyboard("[Enter]");

  expect(
    await findByText("Please enter the file name for the spec.")
  ).toBeInTheConsole();
  userEvent.keyboard("login");
  userEvent.keyboard("[Enter]");

  expect(
    await findByText("Are you writing this spec in JavaScript or TypeScript?")
  ).toBeInTheConsole();
  userEvent.keyboard("[Enter]");

  await waitFor(() => fs.promises.stat(expectedSpecFilePath));
  // await waitFor(() => fs.promises.stat(expectedCommandFilePath));

  const outputSpec = fs.readFileSync(expectedSpecFilePath, "utf8");
  // const outputCommand = fs.readFileSync(expectedCommandFilePath, "utf8");

  expect(outputSpec).toMatch(templateSpec);
  // expect(outputCommand).toMatch(templateCommand);
});