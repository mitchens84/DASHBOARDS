#!/bin/bash

if [ -z "$1" ]; then
    echo "Please provide a .tsx file path"
    exit 1
fi

# Get the absolute path of the input file
INPUT_FILE=$(realpath "$1")

# Copy the target file
cp "$INPUT_FILE" ~/tsx-runner/target.tsx

# Navigate to tsx-runner directory
cd ~/tsx-runner

# Run vite
npm run dev
