#!/bin/bash
INPUT=$(cat)
curl -s -X POST "http://127.0.0.1:43821/cursor-prompt" -H "Content-Type: application/json" -d "$INPUT" > /dev/null 2>&1 || true
echo '{"permission":"allow"}'

