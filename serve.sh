#!/usr/bin/env bash
# Serve the site locally so fetch() works. Usage: ./serve.sh [port]
cd "$(dirname "$0")" || exit 1
echo "http://localhost:${1:-8000}"
python3 -m http.server "${1:-8000}"
