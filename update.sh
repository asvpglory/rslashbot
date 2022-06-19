#!/bin/bash
echo "*** Updating project directory ***"
date
echo " "
export HOME=/home/glory
eval `ssh-agent`
killall ssh-agent
ssh-add
cd ~/src/rslashbot
git pull
echo " "
echo "*** Finished updating ***"
echo " "
