/*散点图组件对象*/

var H5ComponentPoint = function(name, cfg) {  
  var component = new H5ComponentBase(name, cfg);

  // 以第一个数据的比例为大小的100%
  var base = cfg.data[0][1];
  // 输出每个point
  $.each(cfg.data, function(idx, item) {
    var point = $('<div class="point ponit_'+idx+'">');

    var name = $('<div class="name">' + item[0] + '</div>');
    var rate = $('<div class="per">' + (item[1]*100) + '</div>');
    
    point.append(name);
    name.append(rate);

    var per = (item[1]/base*100) + '%';

    point.width(per).height(per);

    if(item[2]) {
      point.css('backgroundColor', item[2]);
    }
    if(item[3] !== undefined && item[4] !== undefined) {
      point.css('left', item[3]).css('top', item[4]);
    }
    // 依次显示每个点
     point.css('transition', 'all 1s ' + idx * .5 +'s');
    component.append(point);
  });

  // 呼吸动画的实现

   component.find('.point').on('click',function(){
    component.find('.point').removeClass('point_focus');
    $(this).addClass('point_focus');
    return false;
   }).eq(0).addClass('point_focus')
  
 
  return component;
}
