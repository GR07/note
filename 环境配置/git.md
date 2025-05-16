# 下载安装


## 下载

https://git-scm.com/downloads


## 安装

默认下一步


## 安装完成后还需要最后一步设置

在命令行输入：

+ 设置名字 git config --global user.name "Your Name"

+ 设置邮箱 git config --global user.email "email@example.com"

设置成功后可以以下命令查下：

+ 查看自己设置的用户名 git config user.name      

+ 查看自己设置的邮箱 git config user.email   



# 配置当前使用电脑关联自己的 github / gitlab 账号

## 第一步 创建SSH Key

在用户主目录下，搜索有没有.ssh目录，如果有，再看看这个目录下有没有 id_rsa 和 id_rsa.pub 这两个文件，如果有，可直接执行第二步。
如果没有，打开命令行，创建 SSH Key 执行以下命令：

ssh-keygen -t rsa -C "guor0707@qq.com"

然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。

如果一切顺利的话，最后可以在用户主目录里找到 .ssh 目录，并且里面有 id_rsa 和 id_rsa.pub 两个文件，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。


## 第二步 SSH 添加到 github / gitlab

打开“Settings”，“SSH Keys”页面：
然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容：
点“Add Key”，你就应该看到已经添加的Key （切记首次千万不要创建README.md）



# 创建一个本地 Git 仓库：

cd 进入文件夹执行 git init 把当前目录变成Git可以管理的仓库，目录下多了一个.git的目录。

注：也不一定必须在空目录下创建Git仓库，选择一个已经有东西的目录也是可以的。



# 把文件代码放进仓库：

+ 第一步：先拷贝文件到仓库，再执行 git add . 把所有文件添加到仓库。

+ 第二步：git commit -m "本次提交说明" 彻底把文件提交到了仓库。

+ git add 文件夹/         提交单个文件夹 
+ git add xxx.js         提交单个文件夹
+ git add .              提交所有      




# github 仓库


## 先有本地库，后有远程库的场景

创建远程仓库并关联推送

+ 第一步 先在 GitHub 上创建一个与本地同名仓库（不要创建README.md）

+ 第二步 在本地的仓库下运行命令：
    1. 关联远程仓库 git remote add origin https://github.com/GR07/note.git 
    2. 推送到远程仓库 git push -u origin master



## 先有远程库，后有本地库的时候

一般装完 vscode、git、node后，直接git clone 项目到本地就行了，如果有修改然后通过vscode提交更改即可。
      
+ 直接克隆到本地 git clone git@github.com:GR07/asdasd.git （不需要 git init 为 git仓库）

+ 注意第一次提交到远程仓库时会提示：

    The authenticity of host 'github.com (13.250.177.223)' can't be established.
    输入 yes 即可。





# 概念

+ 工作区: 工作区就是我们能看到的那些项目文件夹

+ 版本库: 版本库就是隐藏的 .git目录


## .git版本库有什么东西

+ 暂存区

+ Git为我们自动创建的第一个分支master

+ 以及指向 master 的一个指针叫 HEAD

git add 只是提交到了版本库中的暂存区

git commit 把暂存区的东西一次性提交到分支





# 常用命令：

+ 初始化版本库 git init

+ 查看当前仓库状态 git status


+ 添加文件到仓库 git add <file> 添加指定文件 / git add . 添加所有文件

+ 提交代码 git commit -m ""

+ 克隆代码 git clone <url>


+ 添加远程仓库 git remote add origin <url>

+ 远程拉取代码、提交代码到远程 git pull origin  <name> / git push origin  <name>


+ 通过查看命令历史查看版本号 git reflog 

+ 查看 git commit 的历史记录 git log


+ 撤销添加文件 git checkout -- <file>


# 分支管理 （name - 分支名称）

+ git branch 查看本地分支

+ git branch -a 查看远程分支

+ git branch name 在本地创建分支

+ git push origin name 将新分支发布到远程github

+ git branch -d name 在本地删除一个分支

+ git push origin :name 在远程仓库删除一个分支 (分支名前的冒号代表删除)

+ git checkout name / git switch name 切换分支

+ git checkout -b name / git switch -c name 创建+切换分支

+ git merge name 合并某分支到当前分支

+ git checkout -b dev 5f8fe57 恢复本地删除的分支


+ git merge --no-ff -m "" name 合并分支保留分支的提交记录，删除分支不受影响

+ git branch --set-upstream-to origin/20210319 20210319 （本地建完分支后，把本地分支合并到远程分支）

+ cd .\shared\  进入文件夹 

# 模块管理

1. 先克隆主项目

git clone -b dev xxx.com.cn:xxx/base.git --recursive

+ 参数解释

-b dev 只克隆 dev 分支。

--recursive 会递归地将项目中所有子模块的代码拉取。


2. 在主项目下 添加子模块

git submodule add -b dev xxx.com.cn:xxx/你的子项目仓库名.git src/你的子项目仓库名


3. 更新所有子模块

git submodule foreach git pull origin dev


4. 删除子模块

网上流传了一些偏法，主要步骤是直接移除模块，并手动修改 .gitmodules、.git/config 和 .git/modules 内容。包含了一大堆类似git rm --cached <sub-module>、rm -rf <sub-moduel>、rm .gitmodules 和 git rm --cached 之类的代码。

实际上这是一种比较野的做法，不建议使用。

根据官方文档的说明，应该使用 git submodule deinit 命令卸载一个子模块。这个命令如果添加上参数 --force，则子模块工作区内即使有本地的修改，也会被移除。

git submodule deinit project-sub-1
git rm project-sub-1
执行 git submodule deinit project-sub-1 命令的实际效果，是自动在 .git/config 中删除了以下内容：

[submodule "project-sub-1"]
url = https://github.com/username/project-sub-1.git
执行 git rm project-sub-1 的效果，是移除了 project-sub-1 文件夹，并自动在 .gitmodules 中删除了以下内容：

[submodule "project-sub-1"]
path = project-sub-1
url = https://github.com/username/project-sub-1.git
此时，主项目中关于子模块的信息基本已经删除（虽然貌似 .git/modules 目录下还有残余）：

➜ project-main git:(master) ✗ gs
位于分支 master
您的分支与上游分支 'origin/master' 一致。
要提交的变更：
（使用 "git reset HEAD <文件>..." 以取消暂存）
修改： .gitmodules
删除： project-sub-1
可以提交代码：

git commit -m "delete submodule project-sub-1"
至此完成对子模块的删除。





# 工作场景


+ 休假回来后，刚写完需求，准备提交

    1. 先查看状态有哪些文件改动了                       git status
    2. 再查看具体有哪些修改                              git diff xxx.js
    3. 知道了以上情况后，再把自己代码提交到仓库就放心多了   git add / git commit
    4. 最后看看仓库的当前状态（养成好习惯）                git status


+ 删错了文件管理器中的文件

恢复被删除文件的最新状态  git checkout -- xxx.js





# 提交时疑难杂症


+ git push 提示

fatal: The current branch feature-guorui04-2021-6-1 has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin feature-guorui04-2021-6-1

表示当前分支没有与远程分支关联。

解决方案：
（1）直接 git push origin feature-guorui04-2021-6-1 推向制定的分支，最强暴的方法。
（2）正如上面所说关联远程分支。

git push --set-upstream origin feature-guorui04-2021-6-1 是默认的远程版本库名称
这样关联有一个好处，以后就不用每次git push都用第（1）种方法。


+ 提交到远程仓库失败

    1. 情况一：git push origin master 失败

        推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突，解决办法也很简单，
        先用git pull把最新的提交从origin/dev抓下来，然后，在本地合并，解决冲突，再推送。


    2. 情况二：git pull 失败

        因是没有指定本地分支与远程分支的链接，
        根据提示，设置本地分支和远程分支的链接，
        git branch


    3. 情况三：git remote进行身份验证

        修改了gitlub上密码，未同步到windows凭据管理器中
        1. 控制面板→用户账户→凭据管理器
        2. 修改密码与gitlab上一致,完成！


+ 名称大小写更改后，git无法检测出更改

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






# Git管理疑难场景解决

Git 在工作中是很重要的一部分，如果操作不熟练或者使用不规范，很容易造成很多麻烦。
在本文中，将介绍几种疑难场景的应对方式，希望能帮助到大家。

## 场景一：修改 commit

有的时候想修改最新的一次提交的 commit 信息
注：支持远程分支，前提是个人分支还没有合并到公共分支。

1. git commit --amend
2. 键入 i 进入输入模式。
3. 修改完成按下 Esc 键退出编辑模式。
4. 键入 :wq 回车退出并保存修改。
5. git push 提交即可。


## 场景二：将修改内容合并到最近一次的 commit

当一个功能点已经开发完了，已经提交，突然发现有个小问题，修改完了以后，我又不想为这个小错误添加一个新的 commit，那样显得提交历史特别傻？那么该怎么办呢？
注：支持远程分支，前提是个人分支还没有合并到公共分支。


1. git add . 添加这个对应的小修改。
2. git commit --amend --no-edit 将修改直接合并到最新的一次的 commit，并且使用上次的提交信息。


## 场景三：回退到某个 git 操作时刻

拉完分支后，一顿操作提交修改，但是又后悔了，想回到某个 git 操作时刻。

- git reset HEAD@{index} 操作后就会回到之前的某个状态了（index 是对应的操作记录，下图红色圈选部分）。
- git reset HEAD@{index} --hard 就是啥都不要了，当前已经修改没有提交的文件也不要了，我就想回到那个操作对应的状态。一下就清净了。
- git reset HEAD@{index} --soft 保留当前的修改回到对应的状态。
- hard 是把改动全部都丢弃，而 soft 则柔软一些，仅仅是把所做的 commit 丢掉，而改动都保留在本地。
- git reset --hard xxxx 回退到指定的 commit hash

- 注：git reflog 和 git log 区别
reflog 不仅仅是提交的记录，还有其他 git 的操作记录，因为有时候 git log 都不正常，所以使用 reflog。



## 场景四：删除某个 commit 回退某个提交（用于已推送的提交）

在提测修改 bug 阶段，可能之前修复了一个 bug，因为修复这个bug的那次提交才导致了后面一系列的问题，所以希望只删除这个 commit
注：本次删除的代码会作为最新一次的提交进行保存
注：支持远程分支，前提是个人分支还没有合并到公共分支。

1. git log 先看提交（ 加参数 --graph 展示图表形式）（或者去git仓库看commit记录）
2. git revert xxxxx 指的是 commit 提交记录对应的 hash



## 场景五：暂存工作区

正在 feature 分支上开发新功能，这时生产环境上出现了一个 bug 需要紧急修复，但是这部分代码还没开发完，不想提交，怎么办？
这个时候可以用 git stash 命令先把工作区已经修改的文件暂存起来。然后切换分支进行 bug 的修复，修复完成后，切换回 feature 分支，从堆栈中恢复刚刚保存的内容。

1. git stash save "message" 执行存储时，添加备注，方便查找。
2. git stash list 查看 stash 存储列表
3. git stash pop 应用最近一次暂存的修改，并删除暂存的记录。
4. git stash apply stash@${num} 应用某个存储，但不会把存储从存储列表中删除即 stash@{xx}。
5. git stash clear 删除所有缓存的 stash




## 场景六：合并 commit

这是一个延伸的需求，如何整理自己的 commit，保持 commit 清晰？
这是我经过多次解决处理冲突合并后引发的思考。


- 背景

当我们开发一个功能时，可能会存在多次的 commit，如果直接合并到公共分支，就会在公共分支有着多次提交记录，我的理解其实对于公共分支来说，一个功能点只需要一个提交记录即可，会让公共分支变得清爽些，降低团队代码冲突的风险。


- 解决

可以在本地把多个相似的 commit 合并为一个 commit 记录


- 合并时的两种情况

    这些 commit 还没有提交到远程
    这些 commit 已经提交到了远程



- 没有提交到远程


    - 使用 git reset

        1. git log 查看要合并的最早的 commit hash
        2. git reset hash 回退到此 commit。因为没有使用 --hard 所以修改内容都保存在工作区
        3. git add . 将回退的的内容再次添加到暂存区。
        4. git commit -m "提交描述" 再次提交。
        5. git log 使用命令查看，发现合并完成。



    - 使用 git rebase

        1. git log 查看要合并的最早的 commit hash
        2. git rebase -i [startpoint] [endpoint] 进入交互界面
            - 其中 -i 的意思是 –interact，即弹出交互式的界面让用户编辑完成合并操作。
            - [startpoint] [endpoint] 是开始结束的区间。
            - [startpoint] 是指需要合并的commit的前一个commit。
            - [endpoint] 一般是省略不写，默认从起始的 commit 一直到最后一个 commit。
            - 如果写了 [endpoint]，那么 [endpoint] 后面的 commit 就全不要了，所以慎用

        3. 使用 s 命令，合并 commit
            - pick 保留该 commit
            - squash 将该 commit 合并到前一个 commit

        4. 先按键盘 i 键，进入操作模式，把 commit hash 前面的 pick 都改成 s
            - 注意第一个默认是 pick 不许改。
            - 如果不小心改了报错，执行 git rebase --abort
            - 重新再执行 git rebase -i xxxxx

        5. 改完之后，按 esc 键退出操作模式，然后键盘 :wq 保存操作并退出

        6. 成功后，会弹出展示这几个 commit 的提交信息，把需要合并的 commit 注释即可
            - 按i 键，在二三个 commit 信息前面加 # 号，然后按 esc，最后 :wq 保存即可

        7. git log 最后查看最新合并情况




- 已经提交到了远程

    1. 先使用上面提到的任意一种进行 commit 的本地合并
    2. git push --force-with-lease origin feature-gr 然后强制推送覆盖



# 总结

对于 git 工作流，我认为 commit 以及 branch 都要有意义，也就是，一个小功能最好就要开一个分支，每个分支里要有一些有意义的 commit。 

好处就是 commit 在主干上变得清爽不混乱，冲突也会很少，review 代码速度加快，commit 都是有意义的，而且利于回退。



# 版本回退

回退的两种方式

- reset

- revert 



revert

在当前版本的基础上新增一个版本，不影响以前的代码。

1. git log 查看版本号
2. git revert -n xxxxx 命令将版本回退。xx 指的是 commit 提交记录对应的 hash。
3. 这里可能会出现冲突，需要手动解决冲突。
4. 解决冲突后，按照正常的提交流程 add commit push 即可。
5. 会在后面生成一个新的提交记录，不会影响到以前的版本。


reset-命令操作

该命令会强行覆盖当前版本和要回退的版本之间的其他版本。

1. git log 查看版本号
2. git reset --hard xxxxx 命令将版本回退。xx 指的是 commit 提交记录对应的 hash。
3. git log 查看记录，发现之前的提交记录都没了，被覆盖了。
4. 到了这里，其实只是本地回退了版本而已，远程仓库的并没有回退。
5. 如果想要将本地的代码直接 push 到远程仓库则会提示需要更新远程仓库，如果更新执行​ ​git pull​ ​的话，又会将刚才回退的版本下载回来。
6. 所以此时需要强制将本地代码推送至远程仓库之中，用 git push --force-with-lease origin feature-gr-test
7. 去未来版本：
git reset --hard xxxx，如果回退后想再回来，但是不知道后面消失的版本号：git reflog 通过查看命令历史查看版本号


revert-界面操作

1. 进入历史记录，可以看到提交的所有记录。
2. 进入某一个即将要回退的版本详情页
3. 单击 Options - Revert 进入回退弹窗
4. 选择需要回退的分支，点击 Revert
5. 如果回滚后，想重新合并，会合并不过去，找到 revert 记录，再点击 revert 即可。


版本回退总结：

reset
优势：简单粗暴不会有冲突的问题。
劣势：会覆盖掉后面的提交记录。

revert
优势：会保留所有的提交记录，本次的回退会作为最新一次的提交记录。
劣势：大概率会有冲突的问题，需要本地解决后再提交。

个人建议：
需要回退一般是生产遇到紧急事故需要回退到之前的版本，那么最看重的就是回退效率，  本地操作 reset 简单粗暴效率高，如果后面需要用到历史提交记录复盘可以查看别的分支。

如果对回退可能导致的冲突有信心可以快速解决，那么选择 revert 方案。

当然了，我这里提到的操作都是测试分支验证的，但实际线上的版本回退场景可能更为复杂多变，还是要根据具体场景进行方案的选用。