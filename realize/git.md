## 概念

工作区: 工作区就是我们能看到的那些项目文件夹

版本库: 版本库就是隐藏的 .git目录


### .git版本库有什么东西

1. 暂存区

2. Git为我们自动创建的第一个分支master

3. 以及指向 master 的一个指针叫 HEAD


git add 只是提交到了版本库中的暂存区

git commit 把暂存区的东西一次性提交到分支





## 常用命令：

### 初始化版本库
git init

### 查看当前仓库状态
git status

### 查看 git commit 的历史记录
git log

### 通过查看命令历史查看版本号
git reflog 

### 添加文件到仓库
git add <file> 添加指定文件   
git add . 添加所有文件

### 撤销添加文件
git checkout -- <file>

### 提交代码
git commit -m ""

### 克隆代码
git clone <url>

### 添加远程仓库
git remote add origin <url>

### 远程拉取代码、提交代码到远程
git pull origin  <name>
git push origin  <name>



## 分支管理 （name-分支名称）

git branch 查看本地分支

git branch -a 查看远程分支

git branch name 在本地创建分支

git push origin name 将新分支发布到远程github

git branch -d name 在本地删除一个分支

git push origin :name 在远程仓库删除一个分支 (分支名前的冒号代表删除)

git checkout name / git switch name 切换分支

git checkout -b name / git switch -c name 创建+切换分支

git merge name 合并某分支到当前分支

git merge --no-ff -m "" name 合并分支保留分支的提交记录，删除分支不受影响


## 版本管理

回退版本：

注：HEAD 标识 代表当前版本、HEAD^代表上一个版本、HEAD^^代表上上一个版本

方式一：git reset --hard HEAD^

方法二：git reset --hard 版本号（版本哈希值）

注意：当到历史版本时，未来的版本信息会从 git log 记录中消失。


去未来版本：

git reset --hard 版本号，如果不知道忘记了版本号：git reflog 通过查看命令历史查看版本号




## 下载安装


### 下载：https://git-scm.com/downloads


### 安装：默认下一步


### 安装完成后：还需要最后一步设置，在命令行输入：
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

git config user.name   查看用户  
git config user.email   查看邮箱


### 设置为Git仓库：

cd 进入文件夹执行 git init 把当前目录变成Git可以管理的仓库，目录下多了一个.git的目录。也不一定必须在空目录下创建Git仓库，选择一个已经有东西的目录也是可以的。


### 把文件代码放进仓库：

#### 第一步：先拷贝文件到仓库，再执行 git add 把文件添加到仓库。

#### 第二步：git commit -m "本次提交说明" 彻底把文件提交到了仓库。

### 提交方式
git add 文件夹/      // 提交单个文件夹 
git add xxx.js   // 提交单个文件夹
git add .            // 提交所有      




## 远程仓库：


### 先有本地库，后有远程库的场景：

1. 本地配置密钥关联

#### 第一步
创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。
如果没有，打开Shell（Windows下打开Git Bash），

创建SSH Key：$ ssh-keygen -t rsa -C "guor0707@qq.com"
然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。

如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。


#### 第二步
登陆GitHub，打开“Settings”，“SSH Keys”页面：
然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容：
点“Add Key”，你就应该看到已经添加的Key （切记首次千万不要创建README.md）


2. 创建远程仓库并关联推送

#### 第一步
先在GitHub上创建一个与本地同名仓库（不要创建README.md）

#### 第二步
在本地的仓库下运行命令：
    git remote add origin https://github.com/GR07/note.git // 关联
    git push -u origin master // 本地推送到远程



### 先有远程库，后有本地库的时候（一般装完vscode、git、node后，直接git clone 项目到本地就行了，如果有修改然后通过vscode提交更改即可。）：
      
1. 直接克隆到本地即可：

git clone git@github.com:GR07/asdasd.git （不需要 git init 为 git仓库）

2. 注意第一次提交到远程仓库时会提示：

The authenticity of host 'github.com (13.250.177.223)' can't be established.
输入 yes 即可。







## 工作场景


### 休假回来后，刚写完需求，准备提交

1. 先查看状态有哪些文件改动了                       git status
2. 再查看具体有哪些修改                              git diff xxx.js
3. 知道了以上情况后，再把自己代码提交到仓库就放心多了   git add / git commit
4. 最后看看仓库的当前状态（养成好习惯）                git status



### git add 之前丢掉工作区的修改
      
git checkout -- xxx.js



### 删错了文件管理器中的文件

恢复被删除文件的最新状态  git checkout -- xxx.js







## 提交时疑难杂症


### 提交到远程仓库失败


#### 情况一：git push origin master 失败

推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突，解决办法也很简单，
先用git pull把最新的提交从origin/dev抓下来，然后，在本地合并，解决冲突，再推送。


#### 情况二：git pull 失败

因是没有指定本地分支与远程分支的链接，
根据提示，设置本地分支和远程分支的链接，
git branch


#### 情况三：git remote进行身份验证

修改了gitlub上密码，未同步到windows凭据管理器中
1.控制面板→用户账户→凭据管理器
2.修改密码与gitlab上一致,完成！


### 名称大小写更改后，git无法检测出更改

原因：git默认配置为忽略大小写，因此无法正确检测大小写的更改

解决方法：

方案一：

运行git config core.ignorecase false，关闭git忽略大小写配置，即可检测到大小写名称更改

方案二：

1.git rm xx  删除本地仓库文件（提前做文件备份）

2.修改文件名

3.git add xx 添加

4.git commit -m ""

5.git push 






## 多人协助：

### 1.本地创建分支并切换：git checkout -b dev
查看当前分支：git branch 分支前面会标一个*号。

### 2.然后就可以在本地dev分支开发
开发完提交
$ git add readme.txt 
$ git commit -m "branch test"

### 3.开发完提交完切换到master分支
$ git checkout master

### 4.把dev分支的工作成果合并到master分支上
$ git merge dev

### 5.合并完成后，就可以放心地删除dev分支了
$ git branch -d dev
Deleted branch dev (was b17d20e).

### 6.删除后，查看branch，就只剩下master分支了：
$ git branch
* master