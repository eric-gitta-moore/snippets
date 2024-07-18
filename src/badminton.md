# badminton

#### 跳过 确认提交资源预定吗?
代码定位：
1. 保存 js，prettier 格式化，terser 再压缩回去
2. whistle 代理
3. 打开页面
4. 点击 `立即预定`
5. 字符串搜索 `确认提交资源预定吗?`（原版代码里面是 unicode 编码不好搜，前面转了一下就能在定位代码了）
6. 断点 `return ys() ? "confirm reserve" : "确认提交资源预定吗?"`
7. 找堆栈，一个个看
    
    找到 `Confirm` 弹窗代码
    ```js
    title: Ye[Ln("(Xh5", 0, 0, 0, 465)](_s),
    onOk: function() {
    ```
8. 把这个入参单独拿出来，把逗号表达式末尾的 confirm 调用 `kP()[In(1155, Z, Q, 3097, 2e3) + "rm"](confirmConf));` 直接替换成 onOk
