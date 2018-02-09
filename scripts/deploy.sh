#!/bin/bash

# Check for changes.
git add dist docs/assets/css/templates docs/assets/js/templates docs/assets/js/datetimepicker.*
if git diff --cached --name-only --quiet; then
  echo "No changes to dist. Exiting."
  exit 0
fi

# Check version.
VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
if git ls-remote --tags git://github.com/circunspecter/datetimepicker.git | egrep --quiet "refs/tags/$VERSION$"; then
  echo "The version number already exists as a tag. Exiting."
  exit 1
fi

# Push dist and tag
if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  REMOTE="https://${GITHUB_TOKEN}@github.com/circunspecter/datetimepicker.git"
  git config user.name "Travis CI"
  git config user.email "builds@travis-ci.com"
  git commit -m "Version: $VERSION | Build: $TRAVIS_BUILD_NUMBER"
  git push $REMOTE HEAD:master  > /dev/null 2>&1
  git tag $VERSION
  git push $REMOTE $VERSION
fi
