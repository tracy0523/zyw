package cn.ycxy.common.util;


/**
 * 
 * <strong>Title : IDUtil </strong>. <br>
 * <strong>Description : ID 生成工具类.</strong> <br>
 * 修改人 修改日期 修改描述<br>
 * -------------------------------------------<br>
 * <br>
 * <br>
 */
public final class IDUtil {
	private IDUtil(){}
	
	/**
	 * 获取UUID（返回：前缀 + 36位随机字符）
	 * @param startWith ID前缀,规则为任意字符,如ROL-,此参数为空则默认为000-
	 * @return ID：前缀 + 36位随机字符
	 */
	public static String getUUID(String startWith) {
		if (startWith == null) {
			startWith = "000-";
		} 
		return startWith + Identities.uuid().toUpperCase();
	}
	
	/**
	 * 获取UUID
	 * @return 36位随机字符
	 */
	public static String getUUID() {
		return Identities.uuid().toUpperCase();
	}
	
}
