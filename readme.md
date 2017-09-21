# louis poulsen led impact

## Development

```bash
npm run dev
```

*Opens development server on `http://localhost:3002/`:*

```bash
npm run build
npm start
```
*Opens production like server on `http://localhost:8080/`*

*Note:* vr-boilerplate makes use of environment variables to choose configuration. Set NODE_ENV to `production` to make use of the production database.

## Linting

Lint your code! Install [`SublimeLinter-eslint`](https://github.com/roadhump/SublimeLinter-eslint) or [`eslint for intellij`](https://plugins.jetbrains.com/plugin/7494) and get linting right in your editor.

You can also run the linter in a terminal by running the lint script: `npm run lint`.

## Test
```bash
npm test
```

Runs linting, and tests - if there are any.

## Deployment

**Staging**

Builds docker image on teamcity on push to master using .umploy

Staging can be found at *Insert url here*


**Production**

Builds docker image on teamcity on new release tag with following format: `v0.0.0`.

Production can be found at *Insert url here*

## Team

### Project manager

### Developers
