# Generator

[![npm version](https://badge.fury.io/js/oh-my-github.svg)](https://badge.fury.io/js/oh-my-github)
[![Dependency Status](https://david-dm.org/oh-my-github/generator.svg)](https://david-dm.org/oh-my-github/generator)
[![devDependency Status](https://david-dm.org/oh-my-github/generator/dev-status.svg)](https://david-dm.org/oh-my-github/generator#info=devDependencies)

Create your `gh-pages` in 1 minute

## Usage

### 1. Installation

- OSX, Linux
- NodeJS 5.2.0+

```
$ npm install -g oh-my-github@0.1.6
```

### 2. Generating Your Github Profile

You should create an access token to send 50+ github API requests ([Link: Creating Access Token](https://github.com/settings/tokens/new))

```
$ mkdir oh-my-github && cd oh-my-github
$ omg init [GITHUB_ID] [GITHUB_REPO]      # (e.g) omg init 1ambda oh-my-github
$ omg generate [GITHUB_TOKEN]
$ omg preview
```

### 3. Pushing gh-pages (TODO)

```
$ npm install -g yo-omg-basic
$ yo omg-basic
$ omg publish
```

<br />

## Development

### Build 

```
$ npm install -g typescript@next tsd gulp jasmine
$ npm install
$ tsd install
```

### Test

```
GITHUB_TOKEN= gulp watch
```

### IDEA Setting

Use TypeScript and ES6 compiler

- TypeScript compiler path

```
~/.nvm/versions/node/v5.0.0/lib/node_modules/typescript/lib $ typescriptService.js path
```

- TypeScript compiler option

```
--experimentalDecorators -t es6 --emitDecoratorMetadata
```

- IDEA TypeScript Compiler Error: `TypeError: hosts.fileExists`

See, https://gist.github.com/1ambda/d04b4406dbb4bed7daa4


