# FasS-image-converter
the practice of FasS and OSS 

## 用途
原图上传到OSS触发函数计算生成svg占位图

## 部署
- 下载ZIP包解压
- npm install potrace  
- 文件夹再次压缩成ZIP
- 上传至阿里云函数计算
- 设置OSS触发器

## 注意
- 阿里云函数计算中OSS需要引用其wrapper
  > const oss = require("ali-oss").Wrapper;
