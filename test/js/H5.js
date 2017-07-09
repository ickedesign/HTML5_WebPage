/*内容管理对象*/

var H5 = function() {
  this.id = ('h5_' + Math.random()).replace('.','_');
  this.el = $('<div class="h5" id="'+this.id+'">').hide();
  this.page = [];
  $('body').append(this.el);

  /**
   * [addPage 新增一个页]
   * @param {string} name [组件的名称，会加入到className中]
   * @param {string} text [页内的默认文本]
   * @return {H5} H5对象，可以重复使用H5对象支持的方法
   */
  this.addPage = function(name ,text) {
    var page = $('<div class="h5_page section">');

    if(name != undefined) {
      page.addClass('h5_page_' + name);
    }
    if(text != undefined) {
      page.text(text);
    }
    this.el.append(page);
    this.page.push(page);
    return this;
  }

  /**
   * [addComponent 新增一个组件]
   * @param {string} name [自定义组件名称]
   * @param {object} cfg  [包含组件属性的对象]
   */
  this.addComponent = function(name, cfg) {
    var cfg = cfg || {};

    /*如果传入的cfg没有type时，默认传入type: 'base'属性*/
    cfg = $.extend({
      type: 'base'
    },cfg);

    // 定义一个变量，存储组件元素
    var component;
    // $('.h5_page')不是一个标准的DOM对象
    var page = this.page.slice(-1)[0];

    switch(cfg.type) {
      case 'base':
        component = new H5ComponentBase(name, cfg);
      break;

      default:
    }

    page.append(component);
    return this;
  }
  /*H5对象初始化呈现*/
  this.loader = function() {
    this.el.fullpage({
      onLeave: function(index, nextIndex, direction) {
        $(this).find('.h5_component').trigger('onLeave');
      },
      afterLoad: function(anchorLink, index) {
        $(this).find('.h5_component').trigger('onLoad');
      }
    });
    this.page[0].find('.h5_component').trigger('onLoad');
    this.el.show();
  }
  return this;
}
