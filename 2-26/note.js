原生JavaScript获取样式的方法：
1.element.style:只能获取写在元素标签中的style属性里的样式值，无法获取定义在<style>和外部文件加载进来的样式属性：
2.window.getComputedStyle():获取当前元素所有的CSS属性值。IE6~8不支持.
(1)window.getComputedStyle("元素","伪类");第二个属性可以是null或者伪类选择器。
(2)可以通过document.defaultView获得当前文档浏览器的window对象。实际上使用defaultView基本上没有必要
3.ele.currentStyle:IE专用,返回元素当前应用的最终CSS属性值。
4.getPropertyValue():获取上述CSS样式当前属性的值,不支持驼峰写法。
window.getComputedStyle(ele,null).getPropertyValue('color');
5.getAttribute():与getPropertyValue类似，差异是属性名是驼峰格式，老的IE浏览器支持