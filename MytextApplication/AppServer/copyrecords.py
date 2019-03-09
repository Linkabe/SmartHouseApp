import shutil
from sys import exit
import datetime


def copyrecords():
    try:
        now = datetime.datetime.now()
        nowformat = now.strftime("%Y-%m-%d %H-%M-%S")
        print("")
        source = './airecords.txt'
        target = './Records.txt' + " " + str(nowformat)
        shutil.copyfile(source, target)
    except IOError as e:
        print("Unable to copy folder. %s" % e)
    print("Your Folder Has Been copied.. Enjoy!")
    exit()


while True:
    if __name__ == "__main__":
        copyrecords()
