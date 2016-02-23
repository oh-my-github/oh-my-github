# oh-my-github

[![npm version](https://badge.fury.io/js/oh-my-github.svg)](https://badge.fury.io/js/oh-my-github)
[![Dependency Status](https://david-dm.org/oh-my-github/generator.svg)](https://david-dm.org/oh-my-github/generator)

Create your Github profile in 5 minute

## Demo

[Link: Demo](https://1ambda.github.io/oh-my-github)

## Usage

### 1. Install

- NodeJS 5.0.0+

```
$ npm install -g oh-my-github@latest
```

### 2. Generate Your Github Profile

You should create an access token to send 50+ github API requests

- *oh-my-github* does **not** require any write permission. It uses public Github API only (e.g [Activity API](https://developer.github.com/v3/activity/))
- [Link: Creating Access Token](https://github.com/settings/tokens/new)

```
$ mkdir oh-my-github && cd oh-my-github
$ omg init [GITHUB_ID] oh-my-github       # (e.g) omg init 1ambda oh-my-github
$ omg generate [GITHUB_TOKEN]             # (e.g) omg generate 394fbad49191aca
$ omg preview
```

### 3. Publishing to gh-pages

You can publish your `oh-my-github.json` using [Github gh-pages](https://pages.github.com/) with viewers

- The repository name must be **oh-my-github** (e.g. *1ambda/oh-my-github* )
- You can create new repository easily ([Link: New Repository](https://github.com/new))

For example, if you want to use [the default viewer](https://github.com/oh-my-github/generator-oh-my-github),

```
$ npm install -g yo
$ npm install -g generator-oh-my-github
$ yo oh-my-github

$ omg publish
```

### 4. Update Existing Profiles

```
$ omg generate [GITHUB_TOKEN]             # (e.g) omg generate 394fbad49191aca
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


