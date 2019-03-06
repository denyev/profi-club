#! /usr/bin/env bash

BACKUP_NAME="profi_club"
BACKUP_PATH="${HOME}/_Backups/${BACKUP_NAME}"
CURRENT_DATE=$(date +"%F")
COUNT=$(ls -1 ${BACKUP_PATH}/${BACKUP_NAME}_${CURRENT_DATE}* | wc -l )

nice -n 19 ionice -c3 \
tar -czvf ${BACKUP_PATH}/${BACKUP_NAME}_${CURRENT_DATE}_$((${COUNT} + 1)).tgz --exclude="node_modules" \
 ../${BACKUP_NAME}
