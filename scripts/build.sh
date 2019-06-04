#!/bin/bash
echo "[Building...]"
echo "[Setting up...]"
rm -rf build 
mkdir build
mkdir build/main
mkdir build/options

echo "[Build React App...]"
cd ./main_page 
npm run build 

cp -r build/static ../build/main
cp -r build/index.html ../build/main
cp -r build/asset-manifest.json ../build/main

echo "[Building options...]"
cd ../options_page
npm run build
cp build/*.html ../build
cp build/*.js ../build

echo "[Building extension...]"
cd ../extension
npm run build

cp -r build/* ../build

echo "[Done!]"