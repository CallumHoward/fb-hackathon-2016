import sys, json

if sys.version_info < (3, 0):
    # Python 2
    import Tkinter as tk
else:
    # Python 3
    import tkinter as tk

import tkMessageBox


def add_service():
    filepath = '/Users/callumhoward/Library/Application Support/obs-studio/plugin_config/rtmp-services/services.json'

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

    with open(filepath, 'w') as f:
        json.dump(out, f)


add_service()

root = tk.Tk()

root.title("Facebook Live OBS Service Installer")
tk.Button(root, text="Exit Installer").pack()
tk.mainloop()
