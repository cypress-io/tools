import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "cli-testing-library";
import { waitFor } from "cli-testing-library";
import * as fs from "node:fs";
import { getFileHelper } from "../utils/file-helper.js";
const { getFilePath } = getFileHelper();

const __dirname = dirname(fileURLToPath(import.meta.url));

test("the API Spec scaffolds the correct file & contents", async () => {
  const expectedFilePath = await getFilePath(
    resolve(
      __dirname,
      "../../../../node_modules/cli-testing-library/dist/cypress/integration/network.spec.js"
    )
  );

  const template = fs.readFileSync(
    resolve(__dirname, "../../src/lib/templates/scaffolds/network.js"),
    "utf8"
  );

  const { findByText, userEvent } = await render("node", [
    resolve(__dirname, "../../src/lib/cli.js"),
  ]);

  expect(await findByText("Spec Scaffold")).toBeInTheConsole();
  userEvent.keyboard("[Enter]");

  expect(
    await findByText("Network Spec - uses cy.intercept()")
  ).toBeInTheConsole();
  userEvent.keyboard("[ArrowDown]");
  userEvent.keyboard("[ArrowDown]");
  userEvent.keyboard("[ArrowDown]");
  userEvent.keyboard("[Enter]");

  expect(
    await findByText("Please enter the file name for the spec.")
  ).toBeInTheConsole();
  userEvent.keyboard("network");
  userEvent.keyboard("[Enter]");

  expect(
    await findByText("Are you writing this spec in JavaScript or TypeScript?")
  ).toBeInTheConsole();
  userEvent.keyboard("[Enter]");

  await waitFor(() => fs.promises.stat(expectedFilePath));

  const output = fs.readFileSync(expectedFilePath, "utf8");

  expect(output).toMatch(template);
});
