import sys
import json
import MySQLdb


data = {}


db = MySQLdb.connect(host="localhost", user="root",passwd="Chegagg1o", db="it350")       
#cur = db.cursor()
#cur.execute("SELECT * FROM person")

#for row in cur.fetchall():
#    print row[0]

if (db):
    data['status'] = '200'
    data['msg'] = 'Could connect to mysql database'    
else:
    data['status'] = '500'
    data['msg'] = 'Could not connect to mysql database'

json_data = json.dumps(data)
sys.stdout.flush()


print(json_data)
sys.stdout.flush()
