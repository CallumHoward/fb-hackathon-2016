import sys, json
import Tkinter
import tkMessageBox

if sys.version_info < (3, 0):
    # Python 2
    import Tkinter as tk
else:
    # Python 3
    import tkinter as tk


top = tk.Tk()
top.title("Facebook Live OBS Service Installer")

C = Tkinter.Canvas(top, bg="white", height=400, width=1100)

coord = 10, 50, 240, 210
#arc = C.create_arc(coord, start=0, extent=150, fill="red")
filename = tk.PhotoImage(file = "streamline-logo-msg.gif")
image = C.create_image(550, 200, image=filename)
exit_button = tk.Button(top, text="Exit Installer", command=quit)

C.pack()
exit_button.pack()
top.mainloop()
