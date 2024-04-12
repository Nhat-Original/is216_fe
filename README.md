# IS216.023 

## Requirements

For building and running the application you need:

- [Node 20 & Npm 10](https://nodejs.org/en/download)

## Run the application locally

Install the dependencies:

``` bash
npm install
```

Run the app in development environment:

``` bash
npm run dev
```

Use a browser to navigate to [http://localhost:3000/](http://localhost:3000/).

## How to name a branch?
 
Branch name pattern:

```text
type/description-in-kebab-case

type/issue-#{issue_number}
```

Examples:

```text
feature/issue-#99
```

```text
hotfix/quick-fix-for-an-emergency
```

Common types according to [simplified convention for naming branches](https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4)
- feature: adding, refactoring or removing a feature
- bugfix: fixing a bug
- hotfix: changing code with a temporary solution and/or without following the usual process (usually because of an emergency)
- test: experimenting outside of an issue/ticket

## How to name a commit message? 

**Commitlint** checks if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

Commit message pattern:

```sh
type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

Examples:

```text
chore: run tests on travis ci
```

```text
fix(server): send cors headers
```

```text
feat(blog): add comment section
```

Common types according to [commitlint-config-conventional (based on the Angular convention)](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) can be:

- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

## References

Read these references if needed:

- [Next.js doc](https://nextjs.org/docs)
