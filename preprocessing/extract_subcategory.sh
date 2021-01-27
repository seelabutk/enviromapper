#!/bin/bash

if [ "$#" -ne 3 ]; then
    echo "Usage:\t ./run.sh <geojson file> <layer name> <variable name>"
    exit
fi

if [ ! -d tmp ]; then
    mkdir tmp
fi

layer=$2
variable_name=$3
counter=0
cat $1 | grep $variable_name | uniq | sed -E -e "s/^[ ]+\"$variable_name\" : [\"]*//" | sed -E -e 's/["]*, //g' | sort | uniq | 
while read -r line;
do
    echo $line
    line=${line//[!0-9]/}
    line=$(echo $line | dos2unix)
    echo $line
    gdal_rasterize -ot Byte -a_nodata 0 -ts 3129 1192 -burn 253 -burn 142 -burn 31 -where "$variable_name='$line'" $1 tmp/temp.tif
    line=$(echo $line | sed 's/ /_/g' | sed -E -e 's/[;\,-/]/_/g' | sed 's/__/_/g' | sed 's/[)(]//g' | tr '[:upper:]' '[:lower:]')
    gdal_translate tmp/temp.tif tmp/"$layer"_"$line"_1.tif
    #gdal_translate -a_srs EPSG:4326 tmp/temp.tif tmp/"$layer"_"$line"_1.tif
    counter=$(( counter+1 ))
done;

counter=0
cat $1 | grep $variable_name | uniq | sed -E -e "s/^[ ]+\"$variable_name\" : [\"]*//" | sed -E -e 's/["]*, //g' | sort | uniq |
while read -r line;
do
    echo $line
    line=${line//[!0-9]/}
    line=$(echo $line | dos2unix)
    echo $line
    gdal_rasterize -ot Byte -a_nodata 0 -ts 3128 1192 -burn 253 -burn 142 -burn 31 -where "$variable_name='$line'" $1 tmp/temp.tif
    line=$(echo $line | sed 's/ /_/g' | sed -E -e 's/[;\,-/]/_/g' | sed 's/__/_/g' | sed 's/[)(]//g' | tr '[:upper:]' '[:lower:]')
    gdal_translate tmp/temp.tif tmp/"$layer"_"$line"_2.tif
    counter=$(( counter+1 ))
done;

