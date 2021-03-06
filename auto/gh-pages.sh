#!/bin/bash

# inspired by https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

set -e

CURRENT_DIR=$(pwd)
WORKING_DIR=$1
TARGET_BRANCH="gh-pages"
GIT_REPO="https://${GITHUB_ACCESS_TOKEN}@github.com/dadleyy/hoctable.git"
CLONE_DIR="$CURRENT_DIR/$WORKING_DIR"
SHA=$(git rev-parse --verify HEAD)
GHP_SIGNAL_STRING="[ghp]"

if [[ "$TRAVIS_COMMIT_MESSAGE" != *"$GHP_SIGNAL_STRING"* ]]; then
  echo "skipping gh-pages, commit message missing \"$GHP_SIGNAL_STRING\" string"
  exit 0
fi

if [ "${WORKING_DIR:0:1}" = "/" ]; then
  CLONE_DIR=$WORKING_DIR
fi

if [ -z "$WORKING_DIR" ]; then
  echo "must provide working dir: \"./auto/gh-pages.sh ./work\""
  exit 1
fi

if [ -d $CLONE_DIR ]; then
  echo "clone destination exists"
  exit 1
fi

mkdir -p $CLONE_DIR
git clone $GIT_REPO $CLONE_DIR

# move to the target branch
cd $CLONE_DIR

if [ ! -z "$(git show-ref refs/heads/gh-pages)" ]; then
  git branch -D $TARGET_BRANCH
fi

git checkout -b $TARGET_BRANCH
git rebase origin/master

# delete the current contents
rm -rf $CLONE_DIR/*

# copy the new compiled project into the clone dir
cp -r $CURRENT_DIR/dist/gh-pages/* $CLONE_DIR

DIFF=$(git diff)

if [ -z "$DIFF" ]; then
  echo "no gh-pages changes, skipping"
  exit 0
fi

# publish the branch
git config --global user.name "auto gh-pages"
git config --global user.email "dadleyy@gmail.com"

git add --all
git commit -m "auto(${SHA}) [ci skip]"
git log -n 1 --oneline
git push -f $GIT_REPO $TARGET_BRANCH

cd $CURRENT_DIR
rm -rf $CLONE_DIR
