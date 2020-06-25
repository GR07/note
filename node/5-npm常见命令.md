npm -v 查看版本

npm init 初始化一个package.json配置文件 后面加 -y快速跳过问答模式

npm install 会根据项目中的package.json配置文件 自动下载全部依赖（--sava是生产环境 --sava-dev是开发环境）

npm list 查看项目都安装了那些包

npm --help 查看npm的命令

npm update jquery 更新指定的包

npm uninstall jquery 卸载指定的包

npm config list 查看npm的配置信息

npm info jquery 查看包在npm上面的所有版本信息

npm config set registry https://xxxxxxxxx 修改所有包的下载源

npm root 项目下的包的安装路径

npm root -g 全局的包的安装路径