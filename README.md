# Patchnotes

⚠️ WORK IN PROGRESS ⚠️

## DEV STEPS

### Dev Env Setup

- [x] Create git repo
- [x] Add .gitignore
- [x] init our npm project
- [x] Add linter
- [x] Make it pretty

### Features

- Ability to parse a string that is in the target changelog source format, and convert it into a useful data structure.

## Commit Message Types

- fix/bugfix
- feat/features
- build
- ci
- docs
- style
- refactor
- perf/performance
- test

## Goals

- Importable node modules & CLI tools
- Detect git logs and parse them according to some consistent format.
  - Choose a format (adhere to standards when possible)

* Allow for some flexibility that takes into account how people actually do their work, instead of how we WANT them to do their work.

## Features

- Adopt "Conventional Changelog" format (actually a variant thereof).
  - <type>: message
  - <type(Topic)>: message
  * <type(stream1, stream2|Topic)>: message

Based on [tutorial](https://youtu.be/OMCAAcfWLD4) by Butterscotch Shenanigans CTO Adam Coster.
