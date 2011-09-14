#! /usr/bin/env node

var cmd = require('test-cmd')
  , adapter = require('./')

if(!module.parent)
  cmd.go(adapter)
  