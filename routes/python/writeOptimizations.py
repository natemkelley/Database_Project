import os
import sys
import subprocess
import json

try:
    command = 'sudo mysqldumpslow -t 7 -s at /var/log/mysql/localhost-slow.log'
    proc = subprocess.Popen(command,stdout=subprocess.PIPE,shell=True)
    (out, err) = proc.communicate()
    outwithoutreturn = out.rstrip('\n')

    #print to file
    f = open("opt/opt.txt", "w+")
    f.write( outwithoutreturn )
    f.close()
except:
    print "failed 1"

#write to json

try:
    x = 0
    data = {}

    with open('opt/opt.txt', 'r') as myfile:
        datdata = myfile.read().replace('\n', '\n')
    
    for line in datdata.splitlines():
        content = line
        if len(content) > 0:
            data[x] = content
            x = x +1

    json_data = json.dumps(data)
    #print(json_data)
except:
    print "failed 2"
    
try:
    f = open("opt/jsonOpt.json", "w+")
    f.write( json_data )
    f.close()
except:
    print "failed 3"
    
sys.stdout.flush()
