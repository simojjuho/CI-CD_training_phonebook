#!/bin/bash

OUTPUT=`curl https://ci-cd-training-phonebook.fly.dev/test`

if [ $OUTPUT = "ok" ]; then
	echo "Working"
	exit 0
else
 	echo "Not working"
 	exit 1
fi
