import sys
import subprocess
import os
input_file = os.getcwd() + "\\public\\uploads\\temp\\" + sys.argv[1]
output_file = "\\".join(input_file.split("\\")[:-1]) + "\\edited_" + sys.argv[1]

def changespeed(speed):
    ffmpeg_command = ["ffmpeg", "-y", "-i", input_file, "-filter:a", "atempo=" + str(speed), output_file]
    subprocess.run(ffmpeg_command)

if (str(sys.argv[2]) == "speedup"):
    changespeed(sys.argv[3])
elif(str(sys.argv[2]) == "slowdown"):
    changespeed(sys.argv[3])
# really bad code above, might fix later TODO fix these 4 completly worthless lines of code
