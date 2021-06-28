#!/bin/bash

DISABLE="$1"; shift

set -e
set -o pipefail

if [ -z "$DISABLE" ]; then
  echo "usage: $0 <true|false>"
  echo ""
  exit 1
fi

JQ="$(command -v jq)"
if [ -z "$JQ" ]; then
  echo "you must have 'jq' installed"
  echo ""
  exit 1
fi

sed -i -e "s,DisableDeploy: .*$,DisableDeploy: \\\"${DISABLE}\\\"," capacitor.config.ts
