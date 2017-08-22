#### 说明

该node小工具是在 [spritesmith](https://github.com/Ensighten/spritesmith) 基础上添加了 mobile 如rem单位时雪碧图的合并

标准为  iPhone6  375 和 标准设计稿 750

fontsize = (375/750)\*100
1rem = 50px


#### 使用

    sprite create pc|mobile [algorithm] -p 10 -s -j


- -p 为 sprite 中每个icon的间距，默认为 5px
- algorithm 为sprite 合成方式与 spritesmith 相同，有['top-down','left-right','diagonal','alt-diagnoal','binary-tree'] 4种
- -s 生成 sass 文件
- -j 生成 json 文件

图片格式为 常见的 4种 .png|.jpg|.jpeg|.gif

#### example

    sprite create mobile top-down -s -j -p 5


#### 注意

- icon源图片以字母数字或下划线命名
- 如果按照报错，并提示有权限问题，请尝试 sudo npm install createsprite -g
