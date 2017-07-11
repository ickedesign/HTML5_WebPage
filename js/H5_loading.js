var H5_loading = function (images, firstPage) {
	// this指向的是H5对象
	var id = this.id;
	// this._images未定义，一定是undefined
	if(this._images === undefined) {
		// 第一次进入
		// 获取需要加载资源的长度
		this._images = (images || []).length;
		// 最开始的情况下已经加载了0个资源
		this._loaded = 0;

		// 把当前对象存储在全局对象window中，用来进行某个图片加载完成后的回调
		window[id] = this;
	
		for(s in images) {
			var item = images[s];
			var img = new Image;
			// img载入完成后，执行一个回调函数
			img.onload = function() {
				window[id].loader();
			}
			img.src = item;
		}

		$('#tate').text('0%');
		// debugger;
		return this;

	} else {
		this._loaded ++;
		$('#rate').text( ( (this._loaded / this._images * 100) >> 0) + '%');
		// debugger;
		if(this._loaded < this._images) {
			return this;
		}
	}
	window[id] = null;

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
    if(firstPage) {
      $.fn.fullpage.moveTo(firstPage);
    }
}
