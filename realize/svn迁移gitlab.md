1.先把项目clone到本地（如果clone失败，可能是git版本问题，https://stackoverflow.com/questions/62168371/assertion-failed-on-git-svn-checkout）

git svn clone -r1:HEAD svn://123.59.76.241/g_project/trunk/{模块名} --username={svnUser} --no-metadata {模块名}

git svn clone -r1:HEAD svn://123.59.76.241/website/Supply-Chain/bussiness-wgs/trunk --username=szguorui --no-metadata bussiness-wgs


2.gitlab新建一个同名项目 不勾选readme.md（否则首次有冲突）


3.提交到远程仓库
git remote add origin ssh://git@gitlab.ininin.com:23/g_project/{模块名}.git
git add .
git commit -m "add gitignore"
git push -u origin master