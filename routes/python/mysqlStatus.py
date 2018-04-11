import sys
import json

data = {}
data['status'] = '418'
data['error'] = 'Could not connect to mysql database'

json_data = json.dumps(data)




print(json_data)
sys.stdout.flush()
