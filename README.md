# 云开发 quickstart
helloworld
这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 使用github协作规范

- 每个人建立自己的分支，分支名为`xxx_workspace`，只能在自己的分支上操作，然后创建`pull request`合并到`master`分支，不能在`master`分支下直接`push`（因为可能两个人改了同一个文件而互相不知道，先提交的代码就会被后提交的代码所覆盖），具体步骤如下：
  - 首先创建自己的分支：`git checkout -b xxx_workspace`，然后只能在自己的分支下提交
  - 每次想要和`master`分支合并之前先在自己的分支下从`master`分支下拉取最新的文件：git pull origin master，然后检查本地的代码，解决冲突
  - 冲突解决完之后在`push`到自己的分支上，创建`pull request`，如果没有冲突会显示可以自动合并，如果不能自动合并则需要回到上一步；如果能自动合并就可以由自己确认合并（合并后自己的分支下的`commit`也会合并到`master`分支下）