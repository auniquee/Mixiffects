import sys
import subprocess
import os
input_file = os.getcwd() + "\\public\\uploads\\temp\\" + sys.argv[1]
print(sys.argv)
print("path:" + os.getcwd())
print("input file: " + input_file)
def changespeed(speed):
    ffmpeg_command = ["ffmpeg", "-y", "-i", input_file, "-filter:a", "atempo=" + str(speed), input_file]
    subprocess.run(ffmpeg_command)

if (str(sys.argv[2]) == "speedup"):
    changespeed(sys.argv[3])
elif(str(sys.argv[2]) == "slowdown"):
    changespeed(sys.argv[3])
#eval(sys.argv[1]+'()');
