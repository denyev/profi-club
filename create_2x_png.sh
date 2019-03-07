#! /usr/bin/env bash

PNG_PATH="src/images/sprites/png"

cd ${PNG_PATH}

if [ -f $(ls -1 *2x.png | head -n 1) ]; then
	rm -vi *2x.png
fi

for FILE in *.png; do
	cp -v "${FILE}" "${FILE/.png/@2x.png}"
done

mogrify -resize 200% *2x.png

file *.png
