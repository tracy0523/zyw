jQuery(function(){
	
});


/**
 * bootstrap 提示框插件
 */
(function($){
	/**
	 * 默认配置信息对象
	 */
	var _defaultOptions = {
		/**
		 * 是否显示关闭按钮，默认：true
		 */
		closeable: true,
		
		/**
		 * 是否增加提示框上下方向的内补（padding），对于较长的提示信息可以设置为true
		 * 默认：false
		 */
		isBlock: false,
		
		/**
		 * 扩展的样式类
		 */
		classes: ''
	};
	
	var _classes = "alert fade in";
	
	/**
	 * 一般信息提示框，背景颜色为黄色，参考bootstrap框架样式
	 * @param _msg 提示信息
	 * @param _options 配置信息对象，参考默认配置实用
	 */
	$.fn.bootAlert = function(_msg, _options){
		var _opts = $.extend({}, _defaultOptions, _options);
		
		return this.each(function(){
			_createMessager($(this), _msg, _opts, '');
		});
		
	};
	
	/**
	 * 一般信息提示框，背景颜色为蓝色，参考bootstrap框架样式
	 * @param _msg 提示信息
	 * @param _options 配置信息对象，参考默认配置实用
	 */
	$.fn.bootAlertInfo = function(_msg, _options){
		var _opts = $.extend({}, _defaultOptions, _options);
		
		return this.each(function(){
			_createMessager($(this), _msg, _opts, 'alert-info');
		});
	};
	
	/**
	 * 成功信息提示框，背景颜色为绿色，参考bootstrap框架样式
	 * @param _msg 提示信息
	 * @param _options 配置信息对象，参考默认配置实用
	 */
	$.fn.bootAlertSuccess = function(_msg, _options){
		var _opts = $.extend({}, _defaultOptions, _options);
		
		return this.each(function(){
			_createMessager($(this), _msg, _opts, 'alert-success');
		});
	};
	
	/**
	 * 错误信息提示框，背景颜色为红色，参考bootstrap框架样式
	 * @param _msg 提示信息
	 * @param _options 配置信息对象，参考默认配置实用
	 */
	$.fn.bootAlertError = function(_msg, _options){
		var _opts = $.extend({}, _defaultOptions, _options);
		
		return this.each(function(){
			_createMessager($(this), _msg, _opts, 'alert-error');
		});
	};
	
	$.fn.bootAlertHide = function(){
		return this.each(function(){
			$(this).fadeOut('normal');
		});
	};
	
	
	/**
	 * private functions
	 * begin
	 */
	function _createMessager($obj,_msg, _opts, _classes){
		$obj.fadeOut('fast', function(){
			$obj.empty();
			$obj.append(_getMessagerHtml(_msg, _classes, _opts));
			$obj.fadeIn('normal');
		});
		
		window.setTimeout(function(){
			$obj.bootAlertHide();
		}, 5000);
	}
	
	function _getMessagerHtml(p_msg, p_classes, p_opts){
		var _classflag = _classes;
		
		if(p_classes != null){
			_classflag += " " + p_classes;
			
		}
		if(p_opts.isBlock){
			_classflag += " alert-block";
		}
		
		var _html = "<div class='"+_classflag+"'>";
		
		if(p_opts.closeable){
			_html += "<button type='button' class='close' data-dismiss='alert'>&times;</button>";
		}
		_html += "<div id='_boot_messager_div_'>"+p_msg+"</div></div>";
		return _html;
	}
	
	/**
	 * private functions
	 * end
	 */
})(jQuery);

