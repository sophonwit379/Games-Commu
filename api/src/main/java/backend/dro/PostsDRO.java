package backend.dro;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

public class PostsDRO {
	
	private int pid;
	private int gid;
	private int uid;
	private String detail;
	private Timestamp date;
	private String username;
	
	public static List<PostsDRO> convertToPostsDRO(List<Object> objects) {
	    return objects.stream().map(obj -> {
	        Object[] array = (Object[]) obj; // Assuming each object is an array

	        PostsDRO post = new PostsDRO();
	        post.setPid((int) array[0]);
	        post.setUid((int) array[1]);
	        post.setGid((int) array[2]);
	        post.setDetail((String) array[3]);
	        post.setDate((Timestamp) array[4]);
	        post.setUsername((String) array[5]);

	        return post;
	    }).collect(Collectors.toList());
	}
	
	public PostsDRO() {

	}
	
	public PostsDRO(int pid, int gid, int uid, String detail, Timestamp date, String username) {
		this.pid = pid;
		this.gid = gid;
		this.uid = uid;
		this.detail = detail;
		this.date = date;
		this.username = username;
	}
	
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public int getGid() {
		return gid;
	}
	public void setGid(int gid) {
		this.gid = gid;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public Timestamp getDate() {
		return date;
	}
	public void setDate(Timestamp date) {
		this.date = date;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
}
