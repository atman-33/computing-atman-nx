## install nx
```
npm install -g nx
```

## create nx workspace NestJS app
```
npx create-nx-workspace@latest --preset nest
```
- workspace name => computing-atman-nx
- app name => server
- nx Cloud => true

## add Angular app
```
npm install @nrwl/angular
```

```
nx generate @nrwl/angular:application --name client \
--style scss \
--prefix can \
--tags scope:client,type:app \
--strict \
--backendProject server \
--routing
```
- standalone => false

## add domain in the library
```
npx nx generate @nx/js:library domain --directory=shared --importPath=@libs/shared/domain --tags=scope:shared,type:domain
```
- unit test runner => none
- bundler => none