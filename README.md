# 哔哩哔哩直播点歌板（前端）

一个基于Vue.js和ant design的前端应用，用于展示歌曲列表，并提供点歌、删除歌曲等功能。此应用程序与后端服务器进行WebSocket通信，以便实现实时同步数据。

## 安装依赖

运行以下命令以安装所需的依赖项：

```
npm install
```

## 运行应用程序

运行以下命令以在本地计算机上启动应用程序：

```
npm run serve
```

启动后，在浏览器中打开`http://localhost:8080`即可访问点歌板应用程序。

## 组件

点歌板应用程序由以下组件组成：

- SongList：用于OBS展示的点歌板。

- SongEditor：用于后台管理的可编辑点歌板。

- SongsSetting：用于修改设置。

  

## 页面路由

  点歌板应用程序有以下页面：

  - `/admin`：管理员登录页面。
  - `/`：OBS展示页面。

## 构建和部署

运行以下命令以构建应用程序：

```
npm run build
```

构建后，在`dist/`目录下生成的文件可以部署到任何Web服务器上。
