package backend.dro;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

public class ReplyCommentsDRO {

	private int cid;
	private int uid;
	private int rid;
	private String detail;
	private Timestamp date;
	private String username;
	
	public static List<ReplyCommentsDRO> convertToReplyCommentsDRO(List<Object> objects) {
		return objects.stream().map(obj -> {
			Object[] array = (Object[]) obj; // Assuming each object is an array

			ReplyCommentsDRO replyComment = new ReplyCommentsDRO();
			replyComment.setCid((int) array[0]);
			replyComment.setUid((int) array[1]);
			replyComment.setRid((int) array[2]);
			replyComment.setDetail((String) array[3]);
			replyComment.setDate((Timestamp) array[4]);
			replyComment.setUsername((String) array[5]);

			return replyComment;
		}).collect(Collectors.toList());
	}

	public ReplyCommentsDRO() {
	}

	public ReplyCommentsDRO(int cid, int uid, int rid, String detail, Timestamp date, String username) {
		this.cid = cid;
		this.uid = uid;
		this.rid = rid;
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

	public int getRid() {
		return rid;
	}

	public void setRid(int rid) {
		this.rid = rid;
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
