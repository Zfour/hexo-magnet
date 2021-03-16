NPM插件安装的部署方法：
npm i hexo-magnet --save
# 或者
cnpm i hexo-magnet --save
注意，一定要加--save，不然本地预览的时候可能不会显示！！！
新增网站根目录_config配置项(不是主题的)：
magnet:
  enable: true
  priority: 1
  enable_page: /
  type: categories
  devide: 2
  display:
    - name: 教程
      display_name: 小冰の魔改教程
      icon: 📚
    - name: 游戏评测
      display_name: 小冰の游戏评测
      icon: 🎮
    - name: 生活趣闻
      display_name: 小冰の生活趣闻
      icon: 🐱‍👓
    - name: vue
      display_name: 小冰の编程学习
      icon: 👩‍💻
    - name: 学习
      display_name: 小冰の读书笔记
      icon: 📒
    - name: 随想
      display_name: 小冰の胡思乱想
      icon: 💡
  color_setting:
    text_color: black
    text_hover_color: white
    background_color: '#f2f2f2'
    background_hover_color: '#b30070'
  layout:
    type: id
    name: recent-posts
    index: 0
  temple_html: '<div class="recent-post-item" style="width:100%;height: auto"><div id="catalog_magnet">${temple_html_item}</div></div>'
  plus_style: ""
更多主题配置请前往：https://github.com/Zfour/hexo-magnet/issues
也欢迎共享自己的配置和进行修改。
接下来来简单说明一下配置项的含义：
enable
参数：true/false
含义：是否开启插件
enable_page
参数：/ 
含义：路由地址，如 / 代表主页。/me/代表自我介绍页等等
priority
参数：1
含义：插件的叠放顺序，数字越大，叠放约靠前。如果你安装了hexo-githubcalendar，请将hexo-githubcalendarnpm插件更新至@1.2.3版本。然后给hexo-githubcalendar添加priority参数。
githubcalendar:
  enable: true
  priority: 3 # 这里加上参数
type
参数：categories/tags
含义：选择筛选分类还是标签
devide
参数：2
含义：表示分隔的列数，2表示分为两列展示
display
参数：
- name: 教程  # 这里是tags或者categories的名称
  display_name: 小冰の魔改教程 # 这里是替换的名称
  icon: 📚 # 这里是展示的图标
含义：配置项，可自行设置，按照设置的顺序展示
color_setting
参数：
text_color: black   # 文字默认颜色
text_hover_color: white # 文字鼠标悬浮颜色
background_color: '#f2f2f2' # 文字背景默认颜色
background_hover_color: '#b30070' # 文字背景悬浮颜色
含义：颜色配置项，可自行设置
layout
参数：type; （class&id）
参数：name; 
参数：index；（数字）
含义：如果说gihubcalendar是一幅画，那么这个layout就是指定了哪面墙来挂画
而在HTML的是世界里有两种墙分别type为id和class。
其中在定义class的时候会出现多个class的情况，这时就需要使用index，确定是哪一个。
最后墙的名字即是name; 
<div name="我是墙" id="recent-posts">      <!-- id=>type  recent-posts=>name    -->
  <div name="我是画框">
        <div name="我是纸">
            <!--这里通过js挂载githubcalendar，也就是画画-->
        </div>  
  </div>  
</div>
temple_html
参数：html模板字段
含义：包含挂载容器
<div class="recent-post-item" style="width:100%;height: auto"> <!--文章容器-->
  <div id="catalog_magnet">  <!--挂载容器-->
    ${temple_html_item}
  </div>
</div>
plus_style
参数：""
含义：提供可自定义的style，如加入黑夜模式。
hexo三连
执行hexo三连
hexo clean && hexo g && hexo s
即可发现已经成功部署。
