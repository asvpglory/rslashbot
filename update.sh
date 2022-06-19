#!/bin/bash
echo " "
echo "*** Updating project directory ***"
echo date
echo " "
export HOME=/home/glory
eval `ssh-agent`
ssh-add
cd ~/src/rslashbot
git pull
echo "*** Finished updating ***"
