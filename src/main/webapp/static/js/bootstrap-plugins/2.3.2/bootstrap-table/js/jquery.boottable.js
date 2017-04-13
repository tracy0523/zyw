
function operatorFmt(value, row, index){
	return "" + value + "";
}
(function($){
	var _defaultOpts = {
		bordered: false, striped: true, hover: true, condensed: false,
		rownumbers: false, singleSelect: false, checkOnSelect: true,
		pagination: true, 	pageSize: 10,
		method:"POST", loadMsg: 'Loading...'
	};
	
	var _boottable_id = "_boottable_id", _table_opts_cache= {}, _table_data_cache = {};
	
	$.fn.boottable = function(p_opts){
		var _opts = $.extend({}, _defaultOpts, p_opts);
		
		return this.each(function(){
			var _$this = $(this);
			if(!_$this.is('table')){
				return true;
			}
			
			_setTable(_$this, _opts);
			
			_table_opts_cache[_$this.attr(_boottable_id)] = _opts;
			
			var _header = new Header(_$this);
			
			_setTableHeader(_$this, _header, _opts);
			
			_setTableFoot(_$this, _opts);
			
			_getData(_$this, _opts, _header, _fillData);
			
			_bindEvent(_$this, _opts);
		});
	};
	
	$.fn.boottable.getRow = function(_rowIndex){
		if(_rowIndex == null || _table_data_cache == null || $(this) == null || $(this).length > 1){
			return null;
		}
		var _data_id = $(this).attr(_boottable_id);
		if(_data_id == null){
			return null;
		}
		var _data_cache = _table_data_cache[_data_id];
		if(_data_cache == null || _data_cache.rows == null || _data_cache.rows.length == 0){
			return null;
		}
		var _rows = _data_cache.rows;
		for(var i = 0; i < _rows.length; i++){
			if(i == _rowIndex){
				return _rows[i];
			}
		}
	};
	
	function _getData(_$tableobj, _opts, _header, _callback){
		if(_opts.url == null){
			_callback(null);
			return;
		}
		var _method = "POST";
		if(_opts.method != null && $.type(_opts.method) == "string"){
			_method = _opts.method.toUpperCase();
		}
		var _params = {};
		if(_opts.queryParams != null && $.isPlainObject(_opts.queryParams)){
			_params = _opts.queryParams;
		}
		
		if("POST" == _method){
			$.post(_opts.url, _params, function(_data){
				if(_data.result){
					var _dataCache = _data.data;
					
					_table_data_cache[_$tableobj.attr(_boottable_id)] = _dataCache;
					
					_callback(_$tableobj, _header, _dataCache, _opts);
				}
			}, "json");
			
		}else if("GET" == _method){
			$.get(_opts.url, _params, function(_data){
				if(_data.result){
					var _dataCache = _data.data;
					
					_table_data_cache[_$tableobj.attr(_boottable_id)] = _dataCache;
					
					_callback(_$tableobj, _header, _dataCache, _opts);
				}
			}, "json");
		}
	}
	
	function _fillData(_$tableobj, _header, _data, _opts){
		if(_data == null){
			return;
		}
		var _tbody = _$tableobj.children("tbody").filter(":first");
		if(_tbody.length == 0){
			_$tableobj.append("<tbody></tbody>");
			_tbody = _$tableobj.children("tbody").filter(":first");
			
		}else{
			_tbody.empty();
		}
		
		var _rows = _data.rows;
		if(_rows == null || _rows.length == 0){
			return;
		}
		
		var _columnLength  = _header.getColumnLength();
		var _rowsstr = [];
		for(var i = 0; i < _rows.length; i++){
			_rowsstr.push("<tr>");
			
			for(var j = 0; j < _columnLength; j++){
				var _options = _header.getColumnOptions(j);
				
				_rowsstr.push("<td valign='middle'>");
				
				if(_options != null){
					if(_options.field != null){
						var _value = _rows[i][_options.field];
						
						if(_options.formatter != null){
							var _fn = (new Function("return " + _options.formatter))();
							_value = _fn(_value, _rows[i], i);
							
						}else{
							if(_options.checkbox != null && $.type(_options.checkbox) == "boolean"
								&& _options.checkbox === true){
								_options.align = "center";
								_value = "<input type='checkbox' value='" +_value+ "' class='boottable-body-checkbox'/>";
							}
						}
						_rowsstr.push(_getAlignHtml(_options.align, _value));
					}
					
					if(_options.rownumbers != null && $.type(_options.rownumbers) == "boolean" 
						&& _options.rownumbers === true){
						_rowsstr.push(_getAlignHtml("center", i+1));
					}
				}
				
				_rowsstr.push("</td>");
			}
			
			_rowsstr.push("</tr>");
			_tbody.append(_rowsstr.join(""));
			_rowsstr = [];
		}
		
	}
	
	function _setTable(_$obj, _opts){
		var _classes = ["table"];
		if(_opts.bordered){
			_classes.push("table-bordered");
		}
		if(_opts.striped){
			_classes.push("table-striped");
		}
		if(_opts.hover){
			_classes.push("table-hover");
		}
		if(_opts.condensed){
			_classes.push("table-condensed");
		}
		_$obj.addClass(_classes.join(" "));
		
		_$obj.attr(_boottable_id, _randomString());
		
		if(_opts.rownumbers != null && $.type(_opts.rownumbers) == "boolean" 
			&& _opts.rownumbers === true){
			_$obj.find("thead > tr").prepend("<th data-options='rownumbers:true,width:20'>&nbsp;</th>");
		}
		
		_$obj.css({
			"font-weight": "normal",
			"font-size": "13px"
		});
	}
	
	function Header(_$obj){
		var _header_tr = _$obj.children("thead").filter(":first").children("tr").filter(":first");
		
		var _column_length = 0;
		var _config = {};
		_header_tr.children("th").each(function(i){
			var _$this = $(this);
			var _data_options = _$this.attr("data-options");
			if(_data_options == null){
				_config[i] = null;
				
			}else{
				_data_options = "{"+_data_options.replace(/\'/g, '"')+"}";
				_data_options = new Function("return " + _data_options)();
				_config[i] = _data_options;
			}
			
			_column_length++;
		});
		
		this.getColumnOptions = function(_column_index){
			return _config[_column_index];
		};
		
		this.getColumnLength = function(){
			return _column_length;
		};
	}; 
	
	function _setTableHeader(_$obj, _header, _opts){
		var _header_tr = _$obj.children("thead").filter(":first").children("tr").filter(":first");
		if(_header_tr.length == 0){
			return;
		}
		
		if(_header == null){
			_header =  new Header(_$obj);
		}
		_header_tr.children("th").each(function(i){
			if(_header == null){
				return true;
			}
			
			var _data_options = _header.getColumnOptions(i);
			if(_data_options == null){
				return true;
			}
			
			var _$this = $(this), _align = _data_options.align;
			
			if(_data_options.width != null){
				_$this.css({
					width: _data_options.width
				});
			}
			if(_data_options.checkbox != null && $.type(_data_options.checkbox) == "boolean" 
				&& _data_options.checkbox === true){
				_$this.css({
					width:"20px"
				});
				_$this.html("<input type='checkbox' class='boottable-header-checkbox' />");
				_align = "center";
			}
			
			_$this.html(_getAlignHtml(_align, _$this.html()));
		});
		
	}
	
	function _setTableFoot(_$obj, _opts){
		if(_opts.pagination != null && $.type(_opts.pagination) == "boolean" 
			&& _opts.pagination === true){
			var _pagination_str = ["<div class='table-pagination' pagination_boottable_id='"+_$obj.attr(_boottable_id)+"'>"];
			_pagination_str.push("<div class='pagination-info pagination-left'>");
			_pagination_str.push("共 <span class='pagination-totalsize'>0</span> 条 | ");
			_pagination_str.push("每页 <span class='pagination-pagesize'>0</span> 条 | ");
			_pagination_str.push("共 <span class='pagination-totalpage'>0</span> 页</div>");
			_pagination_str.push("<div class='pagination pagination-right'><ul><li><a href='#'>«</a></li><li><a href='#'>»</a></li></ul></div>");
			_pagination_str.push("</div>");
			_$obj.after(_pagination_str.join(""));
		}
	}
	
	function _getAlignHtml(_align, _value){
		if(_align != null){
			_align = _align.toUpperCase();
			switch(_align){
				case 'CENTER':
					return "<div class='text-center'>"+_value+"</div>";
				case 'LEFT':
					return "<div class='text-left'>"+_value+"</div>";
				case 'RIGHT':
					return "<div class='text-right'>"+_value+"</div>";
			}
		}
		return _value == null ? "" : _value;
	}
	
	function _bindEvent($obj, _opts){
		$obj.find('.boottable-header-checkbox').on('click', function(){
			var _tbody_chks = $obj.find(".boottable-body-checkbox");
			var _checked = $(this).attr("checked") ? true : false;
			_tbody_chks.attr("checked", _checked);
			if(_checked){
				$obj.find("tr").addClass("info");
			}else{
				$obj.find("tr").removeClass("info");
			}
		});
		
		if(_opts.checkOnSelect != null && $.type(_opts.checkOnSelect) == "boolean" 
			&& _opts.checkOnSelect === true){
			
			$obj.find("tr").live("click", function(){
				var _chk = $(this).find(".boottable-body-checkbox:first");
				var _checked = _chk.attr("checked") ? true : false;
				_chk.attr("checked", _checked ? false : true);
				
				_setTrStyle(!_checked, $obj, $(this));
			});
			
			$obj.find(".boottable-body-checkbox").live("click", function(event){
				var _checked = $(this).attr("checked") ? true : false;
				_setTrStyle(_checked, $obj, $(this).parent().parent().parent());
				event.stopPropagation();
			});
		}
		
		$(".table-pagination[pagination_boottable_id='"+$obj.attr(_boottable_id)+"']");
		
		
		function _setTrStyle(_checked, $obj, _$tr){
			if(!_checked){
				$obj.find('.boottable-header-checkbox').attr("checked", false);
				_$tr.removeClass("info");
				
			}else{
				var _all_checked = true;
				$obj.find('.boottable-body-checkbox').each(function(){
					var _checked = $(this).attr("checked") ? true : false;
					if(!_checked){
						_all_checked = false;
					}
				});
				if(_all_checked){
					$obj.find('.boottable-header-checkbox').attr("checked", true);
				}
				_$tr.addClass("info");
			}
		}
	}
	
	function _randomString(){
		var _date = new Date();
		var _chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
		var _maxPos = _chars.length;
		var _pwd = '';
		for (var i = 0; i < 10; i++) {
			_pwd += _chars.charAt(Math.floor(Math.random() * _maxPos));
		}
		return _pwd + _date.getTime();
	}
})(jQuery);