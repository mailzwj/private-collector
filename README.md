# private-collector
一个Electron练手项目

## 推荐安装

```bash
npm install -g electron electron-packager electron-builder
```

## 编译及预览

* 开发中预览调试
```bash
electron .
```

* 打包app
```bash
electron-packager . PrivateCollector --overwrite
```

* 打包app并加密压缩文件
```bash
electron-packager . PrivateCollector --asar --overwrite
```

* 生成dmg安装包
```bash
electron-builder --platform=darwin --pd=./PrivateCollector-darwin-x64
```
