#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="hello1122" \
	--output .env .env.gpg
