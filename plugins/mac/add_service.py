#!/usr/bin/env python

import json

filepath = '/Users/callumhoward/Library/Application Support/obs-studio/plugin_config/rtmp-services/services.json'


services = {}

with open(filepath) as f:
    out = json.load(f)

fb_live_data = '''
{
    "name": "Facebook Live",
    "common": true,
    "servers": [
        { "name": "Facebook live server", "url": "http://rtmp-api.facebook.com/rtmp/" }
    ],
    "recommended": {
        "keyint": 2,
        "profile": "main",
        "max video bitrate": 2500,
        "max audio bitrate": 160,
        "x264opts": "scenecut=0"
    }
}
'''


out['services'].append(fb_live_data)

#print out['services'][-1]

with open(filepath, 'w') as f:
    json.dump(out, f)
