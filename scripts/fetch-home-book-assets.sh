#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$ROOT_DIR/.tmp/home-book-downloads"
ASSET_DIR="$ROOT_DIR/public/home-book"

mkdir -p \
  "$TMP_DIR" \
  "$ASSET_DIR/hdris" \
  "$ASSET_DIR/textures/cover" \
  "$ASSET_DIR/textures/paper" \
  "$ASSET_DIR/textures/wood" \
  "$ASSET_DIR/overlays" \
  "$ASSET_DIR/models" \
  "$ASSET_DIR/fallback" \
  "$ASSET_DIR/chapters"

echo "Fetching CC0/Public Domain assets for the Bastich Books 3D homepage..."

download_polyhaven_gltf() {
  local asset_id="$1"
  local destination="$ASSET_DIR/models/$asset_id"
  local metadata
  metadata="$(curl -s -A "Mozilla/5.0" "https://api.polyhaven.com/files/$asset_id")"

  mkdir -p "$destination/textures"

  printf "%s" "$metadata" | jq -r '.gltf["1k"].gltf.url' | while read -r url; do
    curl -L "$url" -o "$destination/${asset_id}_1k.gltf"
  done

  printf "%s" "$metadata" \
    | jq -r '.gltf["1k"].gltf.include | to_entries[] | [.key, .value.url] | @tsv' \
    | while IFS=$'\t' read -r relative_path url; do
        mkdir -p "$destination/$(dirname "$relative_path")"
        curl -L "$url" -o "$destination/$relative_path"
      done
}

curl -L "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_09_2k.hdr" \
  -o "$ASSET_DIR/hdris/studio_small_09_2k.hdr"

curl -L "https://ambientcg.com/get?file=Paper004_2K-JPG.zip" \
  -o "$TMP_DIR/Paper004_2K-JPG.zip"

curl -L "https://ambientcg.com/get?file=Wood051_2K-JPG.zip" \
  -o "$TMP_DIR/Wood051_2K-JPG.zip"

curl -L "https://ambientcg.com/get?file=Leather033A_2K-JPG.zip" \
  -o "$TMP_DIR/Leather033A_2K-JPG.zip"

unzip -jo "$TMP_DIR/Paper004_2K-JPG.zip" \
  "Paper004_2K-JPG_Color.jpg" \
  "Paper004_2K-JPG_NormalGL.jpg" \
  "Paper004_2K-JPG_Roughness.jpg" \
  -d "$ASSET_DIR/textures/paper"

unzip -jo "$TMP_DIR/Wood051_2K-JPG.zip" \
  "Wood051_2K-JPG_Color.jpg" \
  "Wood051_2K-JPG_NormalGL.jpg" \
  "Wood051_2K-JPG_Roughness.jpg" \
  -d "$ASSET_DIR/textures/wood"

unzip -jo "$TMP_DIR/Leather033A_2K-JPG.zip" \
  "Leather033A_2K-JPG_Color.jpg" \
  "Leather033A_2K-JPG_NormalGL.jpg" \
  "Leather033A_2K-JPG_Roughness.jpg" \
  -d "$ASSET_DIR/textures/cover"

curl -L "https://freesvg.org/img/Botanical-2015120941.png" \
  -o "$ASSET_DIR/overlays/botanical-public-domain.png"

curl -L "https://freesvg.org/img/botanical-ornament-01.png" \
  -o "$ASSET_DIR/overlays/botanical-ornament-public-domain.png"

curl -L "https://freesvg.org/img/160303_scroll.png" \
  -o "$ASSET_DIR/overlays/old-map-scroll-public-domain.png"

download_polyhaven_gltf "vintage_oil_lamp"
download_polyhaven_gltf "magnifying_glass_01"
download_polyhaven_gltf "book_encyclopedia_set_01"
download_polyhaven_gltf "postcard_set_01"

echo "Done. Review docs/ASSET_SOURCES.md for provenance and model details."
