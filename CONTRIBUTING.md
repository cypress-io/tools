# Contributing to Cypress Tools

Thanks for taking the time to contribute! :smile:

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Opening Issues](#opening-issues)
- [Writing Documentation](#writing-documentation)
- [Writing Code](#writing-code)
    - [Getting Started](#getting-started)
    - [Requirements](#requirements)
    - [Tasks](#tasks)
    - [Tests](#tests)
- [Committing Code](#committing-code)
    - [Branches](#branches)
    - [Pull Requests](#pull-requests)
    - [Dependencies](#dependencies)
- [Reviewing Code](#reviewing-code)
    - [Rules about Code Review](#rules-about-code-review)
    - [Steps to take during Code Review](#steps-to-take-during-code-review)
    - [Code Review Checklist](#code-review-checklist)
    - [Code Review of Dependency Updates](#code-review-of-dependency-updates)
- [Deployment](#deployment)


## Code of Conduct

All contributors are expecting to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Opening Issues

**The most important things to do are:**

- Search existing [issues](https://github.com/cypress-io/tools/issues) for your problem.
- [Fill out the provided issue template](#fill-out-our-issue-template).
- [Describe your problem, not your solution](#describe-problems)
- [Explain how to reproduce the issue](#reproducibility).

Finally, if you are up to date, supported, have collected information about the problem, and have the best reproduction instructions you can give, you are ready to [open an issue](https://github.com/cypress-io/tools/issues/new/choose).

### Fill out our Issue Template

When opening an issue, there is a provided issue template. Fill out the information according to the template. This is information needed for Cypress to continue forward with your problem. Any issues that don't fill out the issue template will be closed.

### Describe Problems

When you file a feature request or bug, it's best to **describe the problem you are facing first**, not just your desired solution.

Often, your problem may have a lot in common with other similar problems. If we understand your use case, we can compare it to other use cases and sometimes find a more powerful or more general solution which solves several problems at once. Understanding the root issue can let us merge and contextualize things. Sometimes there's already a way to solve your problem that might just not be obvious.

Also, your proposed solution may not be compatible with the direction we want to take the product, but we may be able to come up with another solution which has approximately the same effect and does fit into the product direction.

### Reproducibility

**It is nearly impossible for us to resolve issues if we can not reproduce them. Your best chance of getting a bug looked at quickly is to provide a repository with a reproducible bug that can be cloned and run.**


## Writing Documentation

All documentation for the Cypress Tools repos live in this repository in their respective directories `READMEs`.

## Writing code

Working on your first Pull Request? You can learn how from this free series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)


### Getting Started
The project uses [Nx](https://nx.dev/) and leverages Nx to orchestrate running within the context of one or more packages. While it is not as important to understand Nx, it **is important** to note that running scripts or installing new dependencies should always happen from the repo's root directory.


**Install all dependencies:**

```bash
yarn
```

Cypress Tools is a large open source project. When you want to contribute, you may be unsure which part of the project to work within. Cypress Tools uses an Nx workspace, which means there are many independent packages in this repository. Here is a list of libraries and npm packages in this repository: 

| Folder Name                           | Package Name            | Purpose                                                                      |
| :------------------------------------ | :---------------------- | :--------------------------------------------------------------------------- |
| [ci-config](./libs/ci-config)         | `@cypress/ci-config`    | The CI generation tool that is packaged as an `npm` module.                  |


### Requirements

You must have the following installed on your system to contribute locally:

- [`Node.js`](https://nodejs.org/en/) (See the root [.node-version](.node-version) file for minimum version requirements. You can use [avn](https://github.com/wbyoung/avn) to automatically switch to the right version of Node.js for this repo.)
- [`yarn`](https://yarnpkg.com/en/docs/install)


### Tasks

> Scripts are intended to be **run** from the **root of the repo**. **Do not install dependencies or run scripts from within a sub-directory.**

| Task          | Purpose                                                       |
|:------------- | :------------------------------------------------------------ |
| `build`       | Run `nx build my-app` to build a specific project. The build artifacts will be stored in the `dist/my-app` directory. Use the `--prod` flag for a production build |
| `test`        | Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io/) |
| `lint`        | Run `nx lint my-app` to lint a specific project. |
| `e2e`         | Run `nx e2e my-app` to run cypress end-to-end tests for a specific project. |
| `dep-graph`   | Run `nx dep-graph` to see a diagram of the dependencies of all the projects. |
| `affected:build` | Run `nx affected:build` to build only projects that were **affected** by your current changes (run against `master`) |
| `affected:test` | Run `nx affected:test` to execute unit tests for only projects that were **affected** by your current changes (run against `master`) |
| `affected:lint` | Run `nx affected:lint` to lint only projects that were **affected** by your current changes (run against `master`) |
| `affected:e2e` | Run `nx affected:e2e` to run Cypress end-to-end tests for only projects that were **affected** by your current changes (run against `master`) |


### Tests

For most packages there are typically unit and e2e tests.

You execute unit tests for a specific package using `nx test my-app`. You can run Cypress end-to-end tests for a specific package using `nx e2e my-app`. You can also run **affected** tests by using `nx affected:test` or `nx affected:e2e` which only execute tests for projects that were [affected](https://nx.dev/nx/affected#affected) by your current changes (based against `master`).


## Committing Code
### Branches

The repository has one protected branch:

- `master` contains already published code of all [npm packages](./libs). This branch is set as the default branch, and all pull requests should be made against this branch.

We want to publish our [standalone npm packages](./libs) continuously as new features are added. Therefore, after any pull request that changes independent `@cypress/` packages in the [`libs`](./libs) directory will automatically publish when a PR is merged directly into `master` and the entire build passes. We used [`semantic-release`](https://semantic-release.gitbook.io/semantic-release/) to automate the release of these packages to npm.


### Pull Requests

- Break down pull requests into the smallest necessary parts to address the original issue or feature. This helps you get a timely review and helps the reviewer clearly understand which pieces of the code changes are relevant.
- When opening a PR for a specific issue already open, please name the branch you are working on using the convention `issue-[issue number]`. For example, if your PR fixes Issue #803, name your branch `issue-803`. If the PR is a larger issue, you can add more context like `issue-803-new-scrollable-area`. If there's not an associated open issue, **[create an issue](https://github.com/cypress-io/tools/issues/new/choose)**.
- PRs can be opened before all the work is finished. In fact we encourage this! Please create a [Draft Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests#draft-pull-requests) if your PR is not ready for review. [Mark the PR as **Ready for Review**](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/changing-the-stage-of-a-pull-request#marking-a-pull-request-as-ready-for-review) when you're ready for a Cypress team member to review the PR.
- Prefix the title of the Pull Request using [semantic-release](https://github.com/semantic-release/semantic-release)'s format as defined [here](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type). For example, if your PR is fixing a bug, you should prefix the PR title with `fix:`.
- Fill out the [Pull Request Template](./.github/PULL_REQUEST_TEMPLATE.md) completely within the body of the PR. If you feel some areas are not relevant add `N/A` as opposed to deleting those sections. PR's will not be reviewed if this template is not filled in.
- If the PR is a user facing change and you're a Cypress team member that has logged into [ZenHub](https://www.zenhub.com/) and downloaded the [ZenHub for GitHub extension](https://www.zenhub.com/extension), set the release the PR is intended to ship in from the sidebar of the PR. Follow semantic versioning to select the intended release. This is used to generate the changelog for the release. If you don't tag a PR for release, it won't be mentioned in the changelog.
  ![Select release for PR](https://user-images.githubusercontent.com/1271364/135139641-657015d6-2dca-42d4-a4fb-16478f61d63f.png)
- Please check the "Allow edits from maintainers" checkbox when submitting your PR. This will make it easier for the maintainers to make minor adjustments, to help with tests or any other changes we may need.
![Allow edits from maintainers checkbox](https://user-images.githubusercontent.com/1271181/31393427-b3105d44-ada9-11e7-80f2-0dac51e3919e.png)
- All Pull Requests require a minimum of **one** approval.
- After the PR is approved, the original contributor can merge the PR (if the original contributor has access).
- When you merge a PR into `master`, select [**Squash and merge**](https://docs.github.com/en/github/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-pull-request-commits). This will squash all commits into a single commit. *The only exception to squashing is when converting files to another language and there is a clear commit history needed to maintain from the file conversion.*

### Write Some Tests

If you are adding a new feature or fixing a regression, ensure you add tests for it. Broadly speaking, there are three categories of tests you might consider:

Please consider the following when writing your tests:

- ease of understanding
- ease of debugging
- resilience to refactoring

### Dependencies

We use [RenovateBot](https://renovatebot.com/) to automatically upgrade our dependencies. The bot uses the settings in [renovate.json](renovate.json) to maintain our [Update Dependencies](https://github.com/cypress-io/cypress/issues/3777) issue and open PRs. You can manually select a package to open a PR from our [Update Dependencies](https://github.com/cypress-io/cypress/issues/3777) issue.

After a PR has been opened for a dependency update, our `cypress-bot` will comment on the PR detailing the guidelines to be used to review the dependency update. Please read these guidelines carefully and make any updates where you see the PR may not be meeting the quality of these guidelines.

## Reviewing Code

### Rules about Code Review

1. The contributor opening the pull request may not approve their own PR.
2. The PR will not be merged if some reviewers have requested changes.

If any of the Pull Request Review guidelines can't be met, a comment should be left by the reviewer with 'Request changes'. The original contributor is responsible for making any updates and request re-review once those changes are addressed.

### Steps to take during Code Review

- Run the code and use it as the end user would.
- Double check the issue and PR description to ensure it is meeting the original requirements.
- Read through every line of changed code (Yes, we know this could be a LOT).
- If you don't understand why some piece of code is required, ask for clarification! Likely the contributor had a reason and can provide the answer quicker than investigating yourself.

### Code Review Checklist

Below are guidelines to help during code review. If any of the following requirements can't be met, leave a comment in the review selecting 'Request changes', otherwise 'Approve'.

#### User Experience

- [ ] The feature/bugfix is self-documenting from within the product.
- [ ] The change provides the end user with a way to fix their problem (no dead ends).
- [ ] If a breaking change or a change to a commonly used API, the proposed changes have been discussed and agreed upon in the weekly team meeting (or a separate meeting if a larger change).

#### Functionality

- [ ] The code works and performs its intended function with the correct logic.
- [ ] Performance has been factored in (for example, the code cleans up after itself to not cause memory leaks).
- [ ] The code guards against edge cases and invalid input and has tests to cover it.

#### Maintainability

- [ ] The code is readable (too many nested 'if's are a bad sign).
- [ ] Names used for variables, methods, etc, clearly describe their function.
- [ ] The code is easy to understand and there are relevant comments explaining.
- [ ] New algorithms are documented in the code with link(s) to external docs (flowcharts, w3c, chrome, firefox).
- [ ] There are comments containing link(s) to the addressed issue (in tests and code).

#### Quality

- [ ] The change does not reimplement code.
- [ ] There's not a module from the ecosystem that should be used instead.
- [ ] There is no redundant or duplicate code.
- [ ] There are no irrelevant comments left in the code.
- [ ] There is no irrelevant code to the issue being addressed. If there is, ask the contributor to break the work out into a separate PR.
- [ ] Tests are testing the code's intended functionality in the best way possible.


### Code Review of Dependency Updates

- Read through the entire changelog of the dependency's changes. If a changelog is not available, check every commit made to the dependency. **NOTE** - do not rely on semver to indicate breaking changes - every product does not follow this standard.
- Add a PR review comment noting any relevant changes in the dependency.
- If any of the following requirements cannot be met, leave a comment in the review selecting 'Request changes', otherwise 'Approve'.

#### Dependency Updates Checklist

- [ ] Code using the dependency has been updated to accommodate any breaking changes
- [ ] The dependency still supports the version of Node that the package requires.
- [ ] The PR been tagged with a release in ZenHub.
- [ ] Appropriate labels have been added to the PR (for example: label `type: breaking change` if it is a breaking change)


## Releases

[Standalone npm packages](./libs) are deployed immediately when a PR is merged into `master` and the entire build passes.
