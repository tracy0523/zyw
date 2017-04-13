(function($){
	
	$.fn.formWizards = function(){
		
		return this.each(function(){
			var _$this = $(this);
        	
        	var _data_options = _$this.attr("data-options");
			if(_data_options != null){
				_data_options = "{"+_data_options.replace(/\'/g, '"')+"}";
				_data_options = new Function("return " + _data_options)();
				
				if(_data_options.onSubmit != null && $.isFunction(_data_options.onSubmit)){
					var _fn = (new Function("return " + _data_options.onSubmit))();
					_$this.find(".button-submit").click(_fn);
				}
			}
			
			_$this.bootstrapWizard({
        		'nextSelector': '.button-next',
        		'previousSelector': '.button-previous',
        		onTabClick: function (tab, navigation, index) {
        			return false;
        		},
        		onNext: function (tab, navigation, index) {
        			if(_data_options != null && _data_options.onNext != null && $.isFunction(_data_options.onNext)){
        				var _fn = (new Function("return " + _data_options.onNext))();
						_value = _fn(tab, navigation, index);
						if(_value === false){
							return false;
						}
        			}
        			
        			var total = navigation.find('li').length;
        			var current = index + 1;
        			
        			// set done steps
        			$('li', _$this).removeClass("done");
        			var li_list = navigation.find('li');
        			for (var i = 0; i < index; i++) {
        				$(li_list[i]).addClass("done");
        			}
        			
        			if (current == 1) {
        				_$this.find('.button-previous').hide();
        			} else {
        				_$this.find('.button-previous').show();
        			}
        			
        			if (current >= total) {
        				_$this.find('.button-next').hide();
        				_$this.find('.button-submit').show();
        			} else {
        				_$this.find('.button-next').show();
        				_$this.find('.button-submit').hide();
        			}
        		},
        		onPrevious: function (tab, navigation, index) {
        			if(_data_options != null && _data_options.onPrevious != null && $.isFunction(_data_options.onPrevious)){
        				var _fn = (new Function("return " + _data_options.onPrevious))();
						_value = _fn(tab, navigation, index);
						if(_value === false){
							return false;
						}
        			}
        			
        			var total = navigation.find('li').length;
        			var current = index + 1;
        			// set done steps
        			$('li', _$this).removeClass("done");
        			var li_list = navigation.find('li');
        			for (var i = 0; i < index; i++) {
        				$(li_list[i]).addClass("done");
        			}
        			
        			if (current == 1) {
        				_$this.find('.button-previous').hide();
        			} else {
        				_$this.find('.button-previous').show();
        			}
        			
        			if (current >= total) {
        				_$this.find('.button-next').hide();
        				_$this.find('.button-submit').show();
        			} else {
        				_$this.find('.button-next').show();
        				_$this.find('.button-submit').hide();
        			}
        			
        		},
        		onTabShow: function (tab, navigation, index) {
        			if(_data_options != null && _data_options.onTabShow != null){
        				var _fn = (new Function("return " + _data_options.onTabShow))();
						_value = _fn(tab, navigation, index);
						if(_value === false){
							return false;
						}
        			}
        			
        			var total = navigation.find('li').length;
        			var current = index + 1;
        			var $percent = (current / total) * 100;
        			_$this.find('.bar').css({
        				width: $percent + '%'
        			});
        		}
        	});
        	
        	_$this.find('.button-previous').hide();
        	_$this.find('.button-submit').hide();
		});
	};
	
})(jQuery);