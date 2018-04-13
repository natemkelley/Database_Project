import os
import time
import datetime

DB_HOST = 'localhost'
DB_USER = 'root'
DB_USER_PASSWORD = 'Chegagg1o'
DB_NAME = 'it350'
BACKUP_PATH = 'backups/'

DATETIME = time.strftime('%m%d%Y')
TODAYBACKUPPATH = BACKUP_PATH + DATETIME

print "creating backup folder"
if not os.path.exists(TODAYBACKUPPATH):
    os.makedirs(TODAYBACKUPPATH)
    
print "Starting backup of database " + DB_NAME
db = DB_NAME
dumpcmd = "mysqldump -u " + DB_USER + " -p" + DB_USER_PASSWORD + " " + db + " > " + TODAYBACKUPPATH + "/" + db + ".sql"
os.system(dumpcmd)  

print "Backup script completed"
print "Your backups has been created in '" + TODAYBACKUPPATH + "' directory"
