#!/bin/bash

# Iterate through each argument passed to the script
for file in "$@"; do
    # Extract the base filename without the extension
    filename=$(basename "$file" .jpg)

    # Define the temporary file name
    temp_file="/tmp/${filename}_temp.pnm"

    # Use djpeg to scale the image and save it as a temporary file
    djpeg -scale 16/8 "$file" > "$temp_file"

    # Generate the new filename with 'x2' appended
    new_filename="${filename}_x2.jpg"

    # Use cjpeg to write the scaled image to the new filename
    cjpeg "$temp_file" > "$new_filename"

    mv "${filename}_x2.jpg" "${filename}.jpg"

    # Print the name of the new file
    echo "Scaled image replaced tiny one: $filename"
done

