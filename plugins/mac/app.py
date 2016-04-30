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


#add_service()


top = tk.Tk()
top.title("Facebook Live OBS Service Installer")

C = tk.Canvas(top, bg="white", height=400, width=1100)

#coord = 10, 50, 240, 210
#arc = C.create_arc(coord, start=0, extent=150, fill="red")

filename = tk.PhotoImage(file = "streamline-logo-msg.gif")
image = C.create_image(550, 200, image=filename)
exit_button = tk.Button(top, text="Exit Installer")

C.pack()
exit_button.pack()
top.mainloop()
