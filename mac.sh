#!/bin/bash

# Define paths and variables
export FLOW_WING_COMPILER_PATH="FlowWing"
export FLOW_WING_LIB_PATH="/Users/apple/code/per/Flow-Wing-Website"
export FLOW_WING_FILE="server.fg"
export SHARED_LIB_PATH="libflowwing_vortex.a"
export OUTPUT_EXECUTABLE="build/bin/server"

# Compile the C code into a shared library
echo "Compiling C code into shared library..."
clang -fPIC -o $SHARED_LIB_PATH -c mac-server.c

# Check for errors in the C compilation step
if [ $? -ne 0 ]; then
    echo "Error: Failed to compile C code into shared library."
    exit 1
fi



# Check if the shared library was created successfully
if [ ! -f "$SHARED_LIB_PATH" ]; then
    echo "Error: Shared library not created."
    exit 1
fi

export DYLD_LIBRARY_PATH=/Users/apple/code/per/Flow-Wing/lib/mac-silicon/lib:$DYLD_LIBRARY_PATH

# Compile the Flow-Wing code
echo "Compiling Flow-Wing code..."
$FLOW_WING_COMPILER_PATH --F=$FLOW_WING_FILE -O=-O3 -L=$FLOW_WING_LIB_PATH -l=flowwing_vortex

# Check if the executable was created successfully
if [ ! -f "$OUTPUT_EXECUTABLE" ]; then
    echo "Error: Executable not created."
    exit 1
fi

# Run the executable
echo "Running the server..."
$OUTPUT_EXECUTABLE
