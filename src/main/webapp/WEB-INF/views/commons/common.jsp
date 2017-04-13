<!-- /views/commons/common.jsp -->
 
<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@page import="org.springframework.security.core.context.SecurityContext"%>
 

<%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

 
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ path;
pageContext.setAttribute("base_path", basePath);
%>
<c:set var="ui_path" value="${base_path}/static" />
<c:set var="image_path" value="${ui_path}/images" />
<c:set var="css_path" value="${ui_path}/css" />
<c:set var="js_path" value="${ui_path}/js" />
<title>${sys_title }</title>

<!-- 公用 css、js 开始 -->
<script src="${js_path}/1.11.1/jquery.min.js"></script>
<script src="${js_path}/1.11.1/jquery-ui.min.js"></script>
<script src="${js_path}/jquery.validate.js"></script>

<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="${js_path}/bootstrap/3.3.5/bootstrap.min.js"></script>
<script src="${js_path}/bootstrap/docs.js"></script>
<script src="${js_path}/bootstrap/ui/bootstrap-table.js"></script>
<script src="${js_path}/bootstrap/ui/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${js_path}/bootstrap-plugins/2.3.2/bootbox/3.3.0/bootbox.min.js"></script>
<script type="text/javascript" src="${js_path}/bootstrap-plugins/2.3.2/bootbox/3.3.0/zh_CN.js"></script>
<script type="text/javascript" src="${js_path}/bootstrap-plugins/2.3.2/bootstrap.util.js"></script>

<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="${js_path}/jquery-migrate-1.2.1.min.js"></script>


<script type="text/javascript">
var basePath = "${base_path}", uiPath = "${ui_path}", jsPath = "${js_path}", cssPath = "${css_path}", uiFramePath = "${ui_frame_path}", modulesPath = "${modules_path}";
</script>
<!-- 公用 css、js 结束 -->