docker start chrome_browser_1
sudo su
rm ../../../rasyid/chrome/session-master/ioniabotbrowser/Singleton*
chmod 777 -R ../../../rasyid/chrome/session-master/ioniabotbrowser/
exit;
nohup uvicorn main:app &