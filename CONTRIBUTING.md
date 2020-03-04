# Contributing

## Reporting Issues and Asking Questions

Before opening an issue, please search the [issue tracker](https://github.com/elliotstoner/xljsx-lite/issues) to make sure your issue hasn’t already been reported, discussed, or explained.

## Development

Visit the [issue tracker](https://github.com/elliotstoner/xljsx-lite/issues) to find a list of open issues that need attention.

Fork (using the fork button above), then clone your fork (replace `your-username` with your username):

```
git clone https://github.com/your-username/xljsx-lite.git
```

Before opening a PR, the following need to be completed locally (until I can get a pipeline set up to run PR validation):

1. Run tests
2. Run linter
3. Build project (**pro-tip**: running this will run the tests and linter for you)

### Testing
Before submitting any PRs, please ensure that you've added tests for any logic introduced/modified, and run those tests.

To run tests:

```
npm run test // Will run tests once
```

To continuously watch and run tests, run the following:

```
npm run test:watch
```

### Linting

To Lint
```
npm run lint
```

### Building

To build run:

```
npm run build
```

### Submitting a Pull Request

For complex changes, please open an issue with a proposal for a new feature or refactoring before starting on the work - this way you can have feedback about the approach before starting (and possibly having to redo work).

On the other hand, sometimes the best way to start a conversation *is* to send a pull request. Use your best judgement!
