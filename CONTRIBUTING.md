# Contributing

I appreciate your interest in contributing to the Startfi interface!

# Development

## Node Version

- Node 14

## Running the interface locally

1. `yarn install`
2. `yarn start`

## Creating a production build

1. `yarn install`
2. `yarn build`

## Commit Message Format

We have exact rules over how our Git commit messages must be formatted. This format leads to easier-to-read commit history.
Commit messages to consist of:

1. Label
   - feat(module-name) -> Feature
   - fix(module-name) -> Fix
   - refact(module-name) -> Refactor
   - rev(module-name) -> Review
   - enh(module-name) -> enhancement (must be used only for styling commits)
2. Message description.
3. Include related issue/pull request link if exist
   example of fix commit:

```
    fix(Header): Description message <issue url if exist>
```

example of feat commit:

```
    feat(Wallet): Description message <issue url if exist>
```

## Coding Style

I'm borrowing these from [Itwinjs Guidelines](https://www.itwinjs.org/learning/guidelines/typescript-coding-guidelines/)

- 2 spaces for indentation rather than tabs
- You must use `yarn lint` for style unification

## Documentation

We use [compodoc](https://compodoc.app/) for documentation.

Generating document

```
yarn doc-build
```

Run document

```
yarn doc-serve
```

To write descriptions about your [code](https://compodoc.app/guides/comments.html)

## Tracking and Monitoring Bugs

We use [Sentry](https://sentry.io/onboarding/startfi/get-started/) for monitoring and tracking.

Import sentry

```
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
```

Log messages manually `info/errors/warning.`

```
Sentry.captureMessage('Start tracking', { level: Sentry.Severity['Info'] })
```

To catch exceptions

```
try {
  aFunctionThatMightFail();
} catch (err) {
  Sentry.captureException(err);
}S
```
