#!/bin/bash
echo "[Building...]"
echo "[Setting up...]"
rm -rf build 
mkdir build

echo "[Build React App...]"
cd ./main_page 
npm run build 

cp -r build/static ../build
cp -r build/index.html ../build 
cp -r build/asset-manifest.json ../build 

echo "[Building extension...]"
cd ../extension
npm run build

cp -r build/* ../build

echo "[Done!]"