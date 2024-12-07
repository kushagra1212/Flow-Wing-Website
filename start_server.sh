#!/bin/bash
echo "Environment Variables:" > /var/log/fgserver_env.log
env >> /var/log/fgserver_env.log
FlowWing /home/kushagrarathore002/Flow-Wing-Website/server.fg --server && /home/kushagrarathore002/Flow-Wing-Website/build/bin/server
