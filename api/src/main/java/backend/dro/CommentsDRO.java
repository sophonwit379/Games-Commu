package backend.dro;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

public class CommentsDRO {

	private int cid;
	private int uid;
	private int pid;
	private String detail;
	private Timestamp date;
	private String username;
	
	public static List<CommentsDRO> convertToCommentsDRO(List<Object> objects) {
		return objects.stream().map(obj -> {
			Object[] array = (Object[]) obj; // Assuming each object is an array

			CommentsDRO comment = new CommentsDRO();
			comment.setCid((int) array[0]);
			comment.setUid((int) array[1]);
			comment.setPid((int) array[2]);
			comment.setDetail((String) array[3]);
			comment.setDate((Timestamp) array[4]);
			comment.setUsername((String) array[5]);

			return comment;
		}).collect(Collectors.toList());
	}

	public CommentsDRO() {

	}

	public CommentsDRO(int cid, int uid, int pid, String detail, Timestamp date, String username) {

		this.cid = cid;
		this.uid = uid;
		this.pid = pid;
		this.detail = detail;
		this.date = date;
		this.username = username;
	}

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
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
