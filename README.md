# Payo  Contributing Guide

Hi! I'm really excited that you are interested in contributing to sonOFAnton Cpass Project. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Code of Conduct](https://github.com/adeojoemmanuel/payo/blob/master/CODE_OF_CONDUCT.md)
- [Commit Guideline](https://github.com/adeojoemmanuel/payo/blob/master/COMMIT_CONVENTION.md)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)


## Coding  Convetion and rules

-  we are using snake case all through the project
-  never push to master 
-  all database queries must be executed from the database service, while you call the method from the service you are working on


## Pull Request Guidelines

- The `master` branch is just  snapshot of What is Going to be Released when Hosted. All development should be done in dedicated branches. **Do submit PRs against the `master` branch Only when sure on the complition of a particular project.**

- Checkout a topic branch from the relevant branch, e.g. `chats`, and merge back against that branch if you want to do a specific test.

- It's OK to have multiple small commits as you work on your own branch PR - GitHub will automatically squash it before merging.

- If adding a new feature:
  - Add accompanying test case (well...., i would try creating a test directory and samples to be used).
  - Provide a convincing reason to add a feature that was not discussed in meetting in your commit message. 

- If fixing bug:
  - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #3899)`.
  - Provide a detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.

## REQUIREMENT 

You will need [Node.js](http://nodejs.org) **version 8+**, [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/index.html) (for running Selenium server during e2e tests) and [yarn](https://yarnpkg.com/en/docs/install), and A browser obviously.


You would also need [Sequlize-Cli](https://www.npmjs.com/package/sequelize-cli), you can install usiing the command

```
	npm i sequelize-cli
```


## Development Setup


After cloning the repo, run:

``` bash
$ cd  SERVICE_NAME # eg cd auth
```

then 

``` bash
$ npm install # install the dependencies of the project
```

### Committing Changes

Commit messages should follow the [commit message convention](./COMMIT_CONVENTION.md) so that changelogs can be automatically generated. Commit messages will be automatically validated upon commit. If you are not familiar with the commit message convention, you can use `npm run commit` instead of `git commit`, which provides an interactive CLI for generating proper commit messages.


## Project Structure

- Service
	- **`Controller`**: contains build-related scripts and configuration files. Usually, you don't need to touch them. However, it would be helpful to familiarize yourself with the following files:

	- **`node_modules`**: contains the source code. The codebase is written in ES2015 with [Flow](https://flowtype.org/) type annotations.

	- **`public`**: contains all styles and index of a perticular service

	- **`publisher`**: Axon action to publish data to other services ,  

	- **`requesters`**: Axon action to send out request to db.

	- **`responders`**: Axon action to respond  to request.

	- **`routes`**: contains path to spectific methods.

	- **`utils`**: contains custom code for some operation eg(encrytption, validator,).

	- **`test`**: contains all tests. The unit tests are written with [Jasmine](http://jasmine.github.io/2.3/introduction.html) and run with [Karma](http://karma-runner.github.io/0.13/index.html). The e2e tests are written for and run with [Nightwatch.js](http://nightwatchjs.org/). (test would be coming soon)

## notes
- make use of dotenv for every secret variables  (very important)

  
## Credits

Thank you to all the people who have, who are, who Will  contribute to sonOFAnton Cpass project!

