#!/bin/bash

# Variables
RELEASE_NOTES_FILE="release-notes.md"

# Check if there are any tags
if [ "$(git tag)" == "" ]; then
  echo "No tags found. Please create a tag first."
  exit 1
fi

# Get the latest and previous tags
LATEST_TAG=$(git describe --tags --abbrev=0)
PREVIOUS_TAG=$(git describe --tags --abbrev=0 ${LATEST_TAG}^)

# Default message if this is the first release
if [ -z "$PREVIOUS_TAG" ]; then
  echo "Generating release notes for the first release."
  PREVIOUS_TAG=$(git rev-list --max-parents=0 HEAD) # First commit
fi

# Output the tag information
echo "Latest tag: $LATEST_TAG"
echo "Previous tag: $PREVIOUS_TAG"

# Extract version number from the tag (assuming tags are like v1.0.0, v1.1.0, etc.)
VERSION=${LATEST_TAG#v}

# Generate commit messages, excluding merge commits
echo "# Release Notes for Kloo Admin version $VERSION" > $RELEASE_NOTES_FILE
echo "" >> $RELEASE_NOTES_FILE

# Get the commit messages, excluding merge commits and commits starting with "release"
git log --no-merges --invert-grep --grep="^release" --pretty=format:"- %s (%h) by %an" $PREVIOUS_TAG..$LATEST_TAG >> $RELEASE_NOTES_FILE

# Show the release notes
cat $RELEASE_NOTES_FILE
echo ""
echo "Release notes saved to $RELEASE_NOTES_FILE"
