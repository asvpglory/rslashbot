#!/bin/bash
export HOME=/home/glory
eval `ssh-agent`
ssh-add
cd ~/src/rslashbot
git pull
