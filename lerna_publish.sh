#!/bin/bash
pnpm run script:build && pnpm run script:bundle &&
lerna publish \
  --force-publish \
  --ignore-changes '**'