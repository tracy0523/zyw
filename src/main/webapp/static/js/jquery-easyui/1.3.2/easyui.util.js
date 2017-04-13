
(function(window, $){
	$.extend($.messager.defaults,{
		ok:"确定",cancel:"取消"
	});
	
	/**
	 * 扩展 window 默认配置
	 */
	$.extend($.fn.window.defaults, {
		shadow: false,
		onBeforeOpen: function(){
			if(window.self != window.top){
				if('messager-window' == $(this).parent().attr('class')){
					$(this).parent().css({
						top: $(window.top.document).scrollTop() + 150 
					});
				}
			}
		}
	}); 


	/**
	 * jQuery Easyui 工具方法
	 * 	-Grid：datagrid 相关工具方法
	 * 	-Messager：提示框相关工具方法
	 */
	var EasyuiUtil = {};
	
	/**
	 * DataGrid 工具类方法
	 */
	EasyuiUtil.Grid = {
		/**
		 * DataGrid 默认初始化配置，定义了如下常用配置：
		 * 1、显示行编号
		 * 2、用颜色分隔行
		 * 3、选中行时同时选中复选框，选中复选框时同时选中行
		 * 4、数据加载的提示信息：数据加载中...
		 * 5、数据分页显示，以及每页显示的条数：15
		 * 6、数据加载过滤器，该过滤器根据后台返回的结果数据进行判断，需要后台代码配合返回特定格式的数据
		 */
		_defaultConfig: {
			method:"POST",
			rownumbers:true, striped:true, selectOnCheck:true, checkOnSelect:true, 
			loadMsg:"数据加载中...",
			pagination:true, pageSize:10, pageList:[10],
			loadFilter:function(result){
				if(result.result){
					return result.data;
				}else{
					EasyuiUtil.Messager.showError(result.message);
				}
			},
			onLoadSuccess:function(){
				EasyuiUtil.Grid.parserLinkBtn("grid-linkbutton");
			}
		},
		_defaultToolbar:{
		    addToolbar: {iconCls:"icon-add", text:"新增", handler:function(){ }},
		    deleteToolbar: {iconCls:"icon-delete", text:"删除", handler:function(){}}
		},
		
		/**
		 * 初始化DataGrid模板方法
		 * @param gridId 表格ID
		 * @param config DataGrid配置，通过该参数可修改默认配置及增加新配置
		 * 特殊说明：
		 * 1、表格提供了“新增”和“删除”两个操作栏，如果需要使用，则要指定这两个操作的调用方法，通过在config中配置如下属性设置：
		 * config:{
		 * 		toolbarConfig:{
		 * 			add:{ hander: function(){} },	 //新增按钮调用的方法，如果不指定，则“新增”按钮不会显示；可以指定其他属性，覆盖默认的配置，例如显示的名称和图标
		 * 			remove:{ hander: function(){} }		//删除按钮调用的方法，如果不指定，则“删除”按钮不会显示；可以指定其他属性，覆盖默认的配置，例如显示的名称和图标
		 * 		}
		 * }
		 * 2、如果需要增加其他的操作栏，直接通过config配置中的toolbar属性设置，设置方式与 easyui 官方一致即可
		 * 3、如果既使用了默认的操作按钮，又添加了新的操作按钮，则新的操作按钮会跟随在默认的操作按钮后面
		 * 4、如果表格中有需要在数据加载完进行渲染的按钮，则指定按钮的class为 grid-linkbutton，该class的按钮会自动渲染
		 */
		initGrid: function(gridId, config){
			var _config = this.getGridConfig(config);
			$("#"+gridId).datagrid(_config);
			if(_config.pagination){
				EasyuiUtil.Grid.setDataGridPager(gridId);
			}
		},
		
		/**
		 * 获取 DataGrid 常用配置，可通过参数改变默认设置。
		 * @returns
		 */
		getGridConfig: function(config){
			var settings = {};
			$.extend(true, settings, EasyuiUtil.Grid._defaultConfig, config);
			if(config != null && $.isPlainObject(config)){
				
				//配置默认工具栏
				settings.toolbar = [];
				if(config.toolbarConfig != null && $.isPlainObject(config.toolbarConfig)){
					if(config.toolbarConfig.add != null && $.isPlainObject(config.toolbarConfig.add)){
						var addToolbar = this._defaultToolbar.addToolbar;
						addToolbar = $.extend(addToolbar, config.toolbarConfig.add);
						settings.toolbar.push(addToolbar);
					}
					if(config.toolbarConfig.remove != null && $.isPlainObject(config.toolbarConfig.remove)){
						var deleteToolbar = this._defaultToolbar.deleteToolbar;
						$.extend(deleteToolbar, config.toolbarConfig.remove);
						if(settings.toolbar.length > 0){
							settings.toolbar.push("-");
						}
						settings.toolbar.push(deleteToolbar);
					}
				}
				
				//合并扩展工具栏
				if(config.toolbar != null && $.isArray(config.toolbar)){
					for(var i = 0; i < config.toolbar.length; i++){
						settings.toolbar.push(config.toolbar[i]);
					}
				}
				if(settings.toolbar.length == 0){
					settings.toolbar = null;
				}
				
				//分页列表直接覆盖
				if(config.pageList != null){
					settings.pageList = config.pageList;
				}
			}
			return settings;
		},
		
		/**
		 * 设置 DataGrid 本地化分页显示
		 */
		setDataGridPager: function(gridId){
			var p = $("#"+gridId).datagrid("getPager");
			p.pagination({
				beforePageText: '第',
				afterPageText: '页    共 {pages} 页',
				displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
			});
		},
		
		/**
		 * 设置 DataGrid 本地化分页显示（简易版，去除部分内容，用于显示区域不大的页面）
		 */
		setDataGridEasyPager: function(){
			var p = $("#"+gridId).datagrid("getPager");
			p.pagination({
				beforePageText: '第',
				afterPageText: '页    共 {pages} 页',
				displayMsg: '共 {total} 条记录'
			});
		},
		
		/**
		 * 根据行索引获取行对象
		 * @param gridid grid表格ID
		 * @param index 行索引
		 * @returns row 行对象
		 */
		getGridRowByIndex:function(gridId, index){
			var $grid = $("#"+gridId);
			var rows = $grid.datagrid("getRows");
			if(rows == null || rows.length == 0){
				return null;
			}
			var row = null;
			for(var i = 0; i < rows.length; i++){
				if(index == $grid.datagrid("getRowIndex", rows[i])){
					row = rows[i];
					break;
				}
			}
			return row;
		},
		/**
		 * 渲染表格内的按钮（通常用于动态加载的表格内嵌的按钮样式渲染）
		 * @param className 按钮的class名称
		 */
		parserLinkBtn: function(className){
			$("." + className).linkbutton();
		}
	};
	
	/**
	 * Easyui 消息提示框工具方法
	 */
	EasyuiUtil.Messager = {
		/**
		 * 显示信息提示框
		 * @param msg 提示内容
		 * @param fn 回调函数，可为空
		 */
		showAlert:function(msg,fn){
			$.messager.alert("提示消息",msg,"info",function(){
				if(jQuery.isFunction(fn)){
					fn();
				}
			});
		},
		/**
		 * 显示警告提示框
		 * @param msg 提示内容
		 * @param fn 回调函数，可为空
		 */
		showWarning:function(msg,fn){
			$.messager.alert("警告消息",msg,"warning",function(){
				if(jQuery.isFunction(fn)){
					fn();
				}
			});
		},
		/**
		 * 显示错误提示框
		 * @param msg 提示内容
		 * @param fn 回调函数，可为空
		 */
		showError:function(msg,fn){
			$.messager.alert("错误消息",msg,"error",function(){
				if(jQuery.isFunction(fn)){
					fn();
				}
			});
		},
		/**
		 * 显示确认提示框
		 * @param msg 提示内容
		 * @param fn 回调函数，不应为空，用户选择了确定或取消需要回调该函数，回调函数中具有一个参数，参数值为true时代表确定，否则代表取消
		 */
		showConfirm:function(msg,fn){
			$.messager.confirm("确认消息",msg,function(r){
				if(jQuery.isFunction(fn)){
					fn(r);
				}
			});
		},
		/**
		 * 显示等待提示框
		 */
		showWaiting:function(msg){
			if(msg == null){
				msg = "正在处理中...";
			}
			$.messager.progress({text:msg});
		},
		/**
		 * 关闭等待提示框
		 * @param msg 提示内容
		 */
		closeWaiting:function(){
			$.messager.progress('close');
		}
	};
	
	
	window.EasyuiUtil = EasyuiUtil;
	
	/**
	 * 扩展对话框
	 */
	function _extendDialog(){
		if(window.self != window.top){
			$('.easyui-dialog').dialog({
				onBeforeOpen: function(){
					$(this).dialog({
						top: $(window.top.document).scrollTop() + 50
					});
				}
			});
			
		}
	}
	
	
	$(function(){
		_extendDialog();
	});
	
})(window, jQuery);

