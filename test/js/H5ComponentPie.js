/*饼图组件对象*/

var H5ComponentPie = function(name, cfg) {  
  var component = new H5ComponentBase(name, cfg);

  //  背景层
  var w = cfg.width;
  var h = cfg.height;

  // 加入一个画布
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  $(cns).css('zIndex', 1);
  component.append(cns);
  
  var r = w /2;
  // 加入一个底图层
  ctx.beginPath();
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;
  ctx.arc(r, r , r, 0, 2 *Math.PI);
  ctx.fill();
  ctx.stroke();
 
  // 绘制一个数据层
  // 加入一个画布
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  $(cns).css('zIndex', 2);
  component.append(cns);

  // 备用颜色
  var colors = ['red', 'green', 'blue', '#a00', 'purple', 'orange'];
  // 设置开始的角度在12点位置
  var sAngle = 1.5 * Math.PI;
  // 结束角度
  var eAngle = 0;
  // 100%的圆结束的角度
  var aAngle = Math.PI * 2; 

  // test
  /*ctx.beginPath();
  ctx.fillStyle = '#f00';
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 1;
  ctx.moveTo(r, r);
  ctx.arc(r, r , r, sAngle, aAngle);
  ctx.fill();
  ctx.stroke();*/

  var step = cfg.data.length;
  for(var i = 0; i < step; i ++) {
    var item = cfg.data[i];
    var color = item[2] || (item[2] = colors.pop());
    eAngle = sAngle + aAngle * item[1];

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = .1;
    ctx.moveTo(r, r);
    ctx.arc(r, r , r, sAngle, eAngle);
    ctx.fill();
    ctx.stroke();

    sAngle = eAngle;  

    // 加入所有的项目文本以及百分比
    var text = $('<div class="text">');
    text.text(cfg.data[i][0]);
    var per = $('<div class="per">');
    per.text(cfg.data[i][1] * 100 + '%');
    text.append(per);

    var x = r + Math.sin(.5 * Math.PI - sAngle) * r;
    var y = r + Math.cos(.5 * Math.PI - sAngle) * r;

    // text.css('left', x/2);
    // text.css('top', y/2);

    if(x > w/2) {
      text.css('left', x/2);
    } else {
      text.css('right', (w - x)/2);
    }

    if(y > h/2) {
      text.css('top', y/2);
    }else {
      text.css('bottom', (h-y)/2);
    }
    if(cfg.data[i][2]) {
      text.css('color', cfg.data[i][2]);
      // 测试相交开始
      // text.css('color', '#fff');
      // text.css('backgroundColor', cfg.data[i][2]);
      // 测试相交结束
    }
    text.css('opacity', 0);
    component.append(text);
  }

  // 加入一个蒙版层
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  $(cns).css('zIndex', 3);
  component.append(cns);
  
  // 加入一个底图层
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;

  // 生长动画
  var draw = function(per) {
    ctx.clearRect(0, 0, w, h);

    ctx.beginPath();

    ctx.moveTo(r, r);

    if(per <= 0) {
      ctx.arc(r, r , r, 0, 2 *Math.PI);
      component.find('.text').css('opacity', 0);
      // 测试相交
      // component.find('.text').css('opacity', 1);
    } else {
      ctx.arc(r, r , r, sAngle, sAngle + 2 *Math.PI * per, true);
    }
    
    ctx.fill();
    ctx.stroke();

    if(per >= 1) {
      // H5ComponentPie.reSort(component.find('.text'));
      component.find('.text').css('opacity', 1);
      ctx.clearRect(0, 0, w, h);
    }
  }
  draw(0);

  component.on('onLoad', function() {
    // 饼图生长动画
    var s = 0;
    // [0 ,10 , 20, 30 ....] 分100步增加
    for( i = 0; i < 100; i++) {
      setTimeout(function() {
        s += .01;
        draw(s);
      }, i*10 + 500);
    }
  })

  component.on('onLeave', function() {
    // 饼图退场动画
    var s = 1;
    // [0 ,10 , 20, 30 ....] 分100步增加
    // 第一次增加是第10毫秒，第二次第20毫秒...一共1秒
    for( i = 0; i < 100; i++) {
      setTimeout(function() {
        s -= .01;
        draw(s);
      }, i*10);
    }
  })

  return component;
}

// 以下方法比较复杂，暂时无法实现20170711
// 重排项目文本元素
H5ComponentPie.reSort = function(list) {
  // console.log(list);
  // 1. 检测相交
  var compare = function(domA , domB) {

    // 元素的位置，不用它的css left，因为有时候left为auto
    var offsetA = $(domA).offset();
    var offsetB = $(domB).offset();
      
    // domA的投影
    var shadowA_x = [offsetA.left, $(domA).width() + offsetA.left];
    var shadowA_y = [offsetA.top, $(domA).height() + offsetA.top];

    // domB的投影
    var shadowB_x = [offsetB.left, $(domB).width() + offsetB.left];
    var shadowB_y = [offsetB.top, $(domB).height() + offsetB.top];
     
    // 检测x
    var intersect_x = ( shadowA_x[0] > shadowB_x[0] && shadowA_x[0] < shadowB_x[1] ) || ( shadowA_x[1] > shadowB_x[0] && shadowA_x[1] < shadowB_x[1] );
    // 检测y轴投影是否相交
    var intersect_y = ( shadowA_y[0] > shadowB_y[0] && shadowA_y[0] < shadowB_y[1] ) || ( shadowA_y[1] > shadowB_y[0] && shadowA_y[1] < shadowB_y[1] );
    // true则为相交
    return intersect_x && intersect_y;
  }  

  // 定义将要重排的元素
  var willReset = [];
  // debugger;
  // i是key, domTarget是对应的值
  $.each(list, function(i, domTarget) {
    if (list[i+1]) {
     if ( compare( domTarget, list[i+1] ) ) {
      // console.log(list[i+1]);
       willReset.push(list[i]);
     }
    } 
  }); 
  // console.log(willReset);
    // if(list[i + 1]) {
    //   console.log( $(domTarget).text(), $(list[i + 1]).text(), '相交',compare(domTarget, list[i + 1]) );
    // } 


}
// 2. 错开重排
var reset = function(domA, domB) {
  
  if($(domA).css('top') != 'auto') {
    // $(domA).css('top')得到的是一个带px的字符串
    $(domA).css( 'top', parseInt( $(domA).css('top') ) + $(domB).height() );
  }

  if($(domA).css('bottom') != 'auto') {
    $(domA).css( 'bottom', parseInt( $(domA).css('bottom') ) + $(domB).height() );
  }

}

  


  


