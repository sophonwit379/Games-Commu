package backend.dro;

import java.util.List;
import java.util.stream.Collectors;

public class ReportedPostsDRO {

	private int rpid;
	private int pid;
	private int uid;
	private String reason;
	private String status;
	private String username;
	
	public ReportedPostsDRO() {

	}
	
	public ReportedPostsDRO(int rpid, int pid, int uid, String reason, String status, String username) {
		this.rpid = rpid;
		this.pid = pid;
		this.uid = uid;
		this.reason = reason;
		this.status = status;
		this.username = username;
	}

	public static List<ReportedPostsDRO> convertToReportedPostsDRO(List<Object> objects) {
	    return objects.stream().map(obj -> {
	        Object[] array = (Object[]) obj; // Assuming each object is an array

	        ReportedPostsDRO reportedPost = new ReportedPostsDRO();
	        reportedPost.setRpid((int) array[0]);
	        reportedPost.setPid((int) array[1]);
	        reportedPost.setUid((int) array[2]);
	        reportedPost.setReason((String) array[3]);
	        reportedPost.setStatus((String) array[4]);
	        reportedPost.setUsername((String) array[5]);

	        return reportedPost;
	    }).collect(Collectors.toList());
	}

	public int getRpid() {
		return rpid;
	}

	public void setRpid(int rpid) {
		this.rpid = rpid;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
