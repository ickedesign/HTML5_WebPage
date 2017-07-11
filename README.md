HTML5_WebPage
===========================
> H5页面组件化开发[Fullpage.js, CSS3, Canvas, JQuery]

### 页面

![screen_shot1](https://github.com/ickedesign/HTML5_WebPage/blob/master/screen_shot/web1.gif)
![screen_shot2](https://github.com/ickedesign/HTML5_WebPage/blob/master/screen_shot/web2.gif)

1. 首页Loading图
2. 生长折线图
3. 饼图
4. 生长柱形图
5. 雷达图
6. 散点图

### 组件化开发

1. 内容组件类： H5， 在JS文件中添加addPage，addComponent和loader方法，整合fullpage.js，定义链式调用
2. 图文组件类： H5ComponentBase， 页面载入载出，输出DOM，接受onLoad和onLeave事件
3. 图表组件类： H5Component， 在Base的基础上插入DOM结构或Canvas图形。完成柱图，散点图，雷达图，饼图，折线图等

### 功能和技术
1. 页面DOM操作，使用JQuery；页面切换使用FullPage.js
2. 柱图和散点图用HTML + CSS实现，折线图，雷达图和饼图用Canvas实现





