#!/bin/bash

export npm_config_target=5.0.0
export npm_config_arch=x64
export npm_config_target_arch=x64
export npm_config_disturl=https://atom.io/download/electron
export npm_config_runtime=electron
export npm_config_build_from_source=true

rm -rf ./node_modules

HOME=~/.electron-gyp yarn install
