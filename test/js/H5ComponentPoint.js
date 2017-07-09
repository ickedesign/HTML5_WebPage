/*散点图组件对象*/

var H5ComponentPoint = function(name, cfg) {  
  var component = new H5ComponentBase(name, cfg);

  // 以第一个数据的比例为大小的100%
  var base = cfg.data[0][1];
  // 输出每个point
  $.each(cfg.data, function(key, item) {
    var point = $('<div class="point ponit_'+key+'">');

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
    component.append(point);
  });

  return component;
}
