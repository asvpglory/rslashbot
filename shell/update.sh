#!/bin/bash
echo "*** Updating project directory ***"
date
echo " "
export HOME=/home/glory
eval `ssh-agent`
/bin/kill $SSH_AGENT_PID
#ssh-add ~/.ssh/id_rsa
cd ~/src/rslashbot
git pull
echo " "
echo "*** Finished updating ***"
echo " "
