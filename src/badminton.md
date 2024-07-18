# badminton

#### 跳过 确认提交资源预定吗?
whistle 正则替换：
```json
{
    "/,\s*(kP\(\).*?"rm"\])\((\{[\s\S]*?\})\)\)/gmi": ",(window.confirmConf=$2),window.confirmConf.onOk())"
}
```

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


#### 申请原因 默认值
whistle 文本替换：
```json
{
    "{data:e,state:a},e.variable)}))})},Lw=__webpack_require__(75472)": "{data:Object.assign({}, e, {defaultValue:'1'}),state:a},e.variable)}))})},Lw=__webpack_require__(75472)"
}
```

代码定位：
1. React DevTool 光标定位组件到 TextAria
2. 找到 `key=reason` 的组件，报错
3. 定位到该组件的父组件，devtool 右侧进入查看代码，断点 debug
4. 可以找到 `children: t` 是一个 jsx 对象
5. 联系上下文，看到是一个 `useMemo`
6. 找到 `i = (0, tr.useMemo` 这个变量 `i` 下面被用到的地方，断点 debug

    ```diff
    +(0, Aa.jsx)(i, {
        children: null == o ? void 0 : o.map((function(e) {
            return (0,
    +        Aa.jsx)(jw, {
                data: e,
                state: a
            }, e.variable)
        }
        ))
    })
    ```
7. 定位到这个 `data: e` 就是具体的数据
8. 改成 `Object.assign({}, e, {defaultValue:'1'})` 完事
