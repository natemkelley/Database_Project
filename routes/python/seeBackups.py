import os
import sys
import json

data = {}

for file in os.listdir("./backups"):
    month = file[:2]
    day = file[2:4]
    year = file[4:8]
  
    #children.append({"day": day,"month":month,"year":year})
    data[file+".sql"] = {"day": day,"month":month,"year":year}   

json_data = json.dumps(data)
print(json_data)    
sys.stdout.flush()