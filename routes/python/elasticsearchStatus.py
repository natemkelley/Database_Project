from elasticsearch import Elasticsearch
import sys
import json


es = Elasticsearch(['http://192.168.50.33:9200/'], verify_certs=True)
data = {}

if es.ping():
    data['status'] = '200'
    data['error'] = 'Elasticsearch is running'
else: 
    data['status'] = '418'
    data['error'] = 'Could not connect to mysql database'

    
json_data = json.dumps(data)


print(json_data)    
sys.stdout.flush()
