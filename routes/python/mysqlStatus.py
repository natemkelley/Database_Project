import sys
import json

data = {}
data['status'] = '400'
json_data = json.dumps(data)




print(json_data)
sys.stdout.flush()
