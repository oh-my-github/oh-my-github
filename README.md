# oh-my-github

[![npm version](https://badge.fury.io/js/oh-my-github.svg)](https://badge.fury.io/js/oh-my-github)
[![Dependency Status](https://david-dm.org/oh-my-github/generator.svg)](https://david-dm.org/oh-my-github/generator)

Create your Github profile in 5 minute

## Demo

[Link: Demo](https://1ambda.github.io/oh-my-github)

## Usage

### Prerequisites

### 1. Install

- NodeJS 5.0.0+
- `libstdc`, `g++` is required for **Linux**, See, [Linux Installation Guide](https://github.com/oh-my-github/oh-my-github/wiki/Installation-Guide-for-Linux)

```
$ npm install -g oh-my-github@latest
```

### 2. Create Github API token

You should create an access token to send 50+ github API requests

- [Link: Creating Access Token](https://github.com/settings/tokens/new)
- *oh-my-github* does **not** require any write permission. It uses read only Github APIs

### 3. Prepare a viewer

You can publish your `oh-my-github.json` using [Github gh-pages](https://pages.github.com/) with [viewers](https://www.npmjs.com/search?q=oh-my-github%2Cviewer) like the [demo](https://1ambda.github.io/oh-my-github)

- Create a repository to be published. ([Link: New Repository](https://github.com/new)). The repository name must be **oh-my-github** (e.g. *1ambda/oh-my-github* )
- You can create your own viewers (In this tutorial, we will use [Default Viewer](https://github.com/oh-my-github/viewer))

```
$ git clone git@github.com:oh-my-github/viewer.git oh-my-github
$ cd oh-my-github
$ rm -rf .git
```

### 4. Publish to gh-pages

```
$ cd oh-my-github

$ omg init [GITHUB_ID] oh-my-github       # (e.g) omg init 1ambda oh-my-github
$ omg generate [GITHUB_TOKEN]             # (e.g) omg generate 394fbad49191aca
$ omg preview
$ omg publish
```

### 5. Update existing profiles

```
$ cd oh-my-github                         # where `oh-my-github.json` exists
$ omg generate [GITHUB_TOKEN]             # (e.g) omg generate 394fbad49191aca
$ omg publish                             # publish
```

<br/>

## Command

Type `omg -help` in your terminal

```
$ omg -help

  Usage: omg [options] [command]

  Commands:

    init <user> oh-my-github    initialize `oh-my-github.json`
    generate <token>            fill `oh-my-github.json` using github API
    preview                     preview your github profile
    publish                     publish gh-pages using the generated profile

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

  Examples:

    $ omg init 1ambda oh-my-github
    $ omg generate 1b94910adb394014939fal1bfd193bfd762c4191
    $ omg preview
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


