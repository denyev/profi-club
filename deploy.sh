#! /usr/bin/env bash

nice -n 19 ionice -c3 rsync --progress --stats --bwlimit=1000 -e="ssh -p 22" -aAhHvX \
${HOME}/projects/landings/publicis_media/build/* \
denyev@vh10.timeweb.ru:~/landings/public_html/profi_club/build/
