<h1>一个用于虚拟主播群的简易机器人</h1>
<p>1.0.1</p>
<p>功能：</p>
<p>1.推送主播b站开播通知</p>
<p>2.推送主播动态</p>
<p>3.记录主播课表图片，在被询问时发出</p>
<p>4.卡路里百度百科等一些简单的外部api功能</p>
<p>5.根据分词自动回复内容</p>
<p>6.添加对话</p>
<p>执行方式:</p>

```shell
  node app.js
```

需要搭配<a href="https://docs.go-cqhttp.org/">go-cqhttp</a>使用
请注意使用前在appConfig目录下对文件进行配置
</p>
<table>
<tr><td>文件</td><td>作用</td></tr>
<tr><td>-bilibili_config.js</td><td>主播相关配置</td></tr>
<tr><td>-modules_config.js</td><td> 模块注册配置</td></tr>
<tr><td>-server_config.js</td><td> 服务器基础配置</td></tr>
</table>
<hr>
数据库结构在<a href="./qqbot.sql">qqbot.sql</a>
<br>
<br>
表:-public_talk 对话与回复
<table>
<tr><td>属性</td><td>作用</td></tr>
<tr><td>id</td><td>条目id</td></tr>
<tr><td>receive</td><td>接收到的消息</td></tr>
<tr><td>send</td><td>机器人发送的消息</td></tr>
</table>
<br>
表:-receiver 消息接收者 需要手动填写
<table>
<tr><td>属性</td><td>作用</td></tr>
<tr><td>id</td><td>条目id</td></tr>
<tr><td>receiver_id</td><td>群/QQ号</td></tr>
<tr><td>send_type</td><td>发送消息的类型 text/tts</td></tr>
<tr><td>permission</td><td>权限 admin/user</td></tr>
<tr><td>type</td><td>接受者类型 group/private</td></tr>
</table>
<br>
表:-xxy_config 主播配置 需要手动填写
<table>
<tr><td>属性</td><td>作用</td></tr>
<tr><td>v_key</td><td>配置键</td></tr>
<tr><td>value</td><td>配置值</td></tr>
</table>
表内容：需要手动填写
<table>
<tr><td>配置键</td><td>默认配置值</td></tr>
<tr><td>cfczgs_time</td><td>0</td></tr>
<tr><td>dongtai_text</td><td>0</td></tr>
<tr><td>log</td><td>0</td></tr>
<tr><td>kebiao</td><td>0</td></tr>
</table>
