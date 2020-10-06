import subprocess
import sys
import time
import os
from tempfile import mkstemp
from shutil import move
from eks import eks_conf

#=======================================
#	Main Program
#=======================================
if __name__ == "__main__":

	#=====================
	#Parse arguments
	#=====================
	if len(sys.argv) < 2:
		eks_conf.usage()

	mode="Unknown"
	x = 1
	step = 0
	stepto = 0
	while x < len(sys.argv):
		if sys.argv[x] == "steps":
			eks_conf.usage()
		elif sys.argv[x] == "install": 
			if mode == "Unknown":
				mode="install"
				x=x+1
				if x < len(sys.argv) and sys.argv[x].isdigit():
					step=int(sys.argv[x])
				else:
					x=x-1
				x=x+1
				if x < len(sys.argv) and sys.argv[x].isdigit():
					stepto=int(sys.argv[x])
				else:
					x=x-1
		elif sys.argv[x] == "delete": 
			if mode == "Unknown":
				mode="delete"
				x=x+1
				if x < len(sys.argv) and sys.argv[x].isdigit():
					step=int(sys.argv[x])
					stepto=int(sys.argv[x])
				else:
					x=x-1
				x=x+1
				if x < len(sys.argv) and sys.argv[x].isdigit():
					stepto=int(sys.argv[x])
				else:
					x=x-1
		elif sys.argv[x] == "--profile":
			mode="profile" 
			x=x+1
			if x < len(sys.argv):
				profile_name=str(sys.argv[x])
		else:
			print("Unknown argument: {}".format(sys.argv[x]))
			eks_conf.usage()
		x=x+1	

	#==============================================================
	#Execute the script based on mode determined through arguments
	#==============================================================
	if mode == "Unknown":
		print("No execution mode specified.  Please specify install or delete")
		eks_conf.usage()
	elif mode == "install":
		eks_conf.install_eks(step,stepto)
	elif mode == "delete":
		eks_conf.delete_eks(step,stepto)
	elif mode == "profile":
		eks_conf.setAwsProfile(profile_name)		