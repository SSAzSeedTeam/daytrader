import subprocess
import sys
import time
import os
from tempfile import mkstemp
from shutil import move
from command import cmd_parm

# #===========================================
# #	This Module Handles the command execution
# #===========================================
# #	Constants
# #===========================================
# ns=""
divider="--------------------------------------"
version="1.0.0"
aws_values={}

#=======================================
#	Functions
#=======================================
def setAwsProfile(profile):
	os.environ['AWS_DEFAULT_PROFILE']=profile
	print("AWS_DEFAULT_PROFILE set to : {}".format(os.environ['AWS_DEFAULT_PROFILE']))

def onError(command, retval):
	print("Error detected:: ")
	print("command: {}".format(command))
	print("retval: {}".format(retval))
	sys.exit(retval)

def execute_command(command,ignore_error):
	print(divider)
	print("Executing command : {}".format(command))
	p=subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
	for line in p.stdout.readlines():
		print(line)
	retval = p.wait()

	if retval != 0 and ignore_error == False:
		onError(command,retval)

def execute_command_with_status(command,ignore_error,status_command,status):
	print(divider)
	print("Running {}".format(command))

	execute_command(command,ignore_error)

	print("Checking completion status...")
	for x in range(cmd_parm.ATTEMPTS):
		print("Checking attempt #{}".format(x))
		p=subprocess.Popen(status_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
		for line in p.stdout.readlines():
			spaces=line.split()
			print("Status :: {}".format(spaces[0].decode('ascii')))
			if spaces[0].decode('ascii') == status:
				return 0
		retval = p.wait()
		time.sleep(cmd_parm.WAIT_SEC)

	onError(command,retval)

def get_outputs(command,delimiter):
	global aws_values
	p=subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
	for line in p.stdout.readlines():
		line=line.decode('ascii').rstrip()
		tokens=line.split(delimiter)
		print("Adding key {0} with value {1}".format(tokens[0],tokens[1]))
		aws_values[tokens[0]]=tokens[1]
	

def replace(file_path, pattern, subst):
	fh, abs_path = mkstemp()
	with os.fdopen(fh,'w') as new_file:
		with open(file_path) as old_file:
			for line in old_file:
				new_file.write(line.replace(pattern, subst))
	os.remove(file_path)
	move(abs_path, file_path)	

def insert_lines(file_path, pattern, subst):
	fh, abs_path = mkstemp()
	with os.fdopen(fh,'w') as new_file:
		with open(file_path) as old_file:
			for line in old_file:
				if line.rstrip() == pattern:
					for str in subst:
						new_file.write(str+"\n")
				new_file.write(line)
	os.remove(file_path)
	move(abs_path, file_path)

