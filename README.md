#### 说明

该node小工具是在 [spritesmith](https://github.com/Ensighten/spritesmith) 基础上添加了 mobile 如rem单位时雪碧图的合并

标准为  iPhone6  375 和 标准设计稿 750

fontsize = (375/750)\*100

*注意*

- 暂且不支持 node 7.x 及以上版本
- icon源图片不要以中文命名
- icon源图片尽量都是同样宽高尺寸的图片，如果尺寸不同会先对图片进行适当的等比缩放（以最小尺寸为准）


#### 使用

    sprite create pc|mobile [algorithm] -p 10 -s -j


-p 为 sprite 中每个icon的间距，algorithm 为sprite 合成方式 mobile为了方便只有 'top-down'和 'left-right'两种，pc则与 spritesmith 相同，有['top-down','left-right','diagonal','alt-diagnoal','binary-tree'] 4种

图片格式为 常见的 4种 .png|.jpg|.jpeg|.gif 暂不支持其他类型

#### example

    sprite create mobile top-down -s -j -p 5
