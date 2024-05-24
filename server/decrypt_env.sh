#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="$DECRYPT_ENV_SECRET" \
	--output .env .env.gpg
