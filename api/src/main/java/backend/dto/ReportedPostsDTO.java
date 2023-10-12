package backend.dto;

public class ReportedPostsDTO {

	private Integer pid;
	private String reason;

	public ReportedPostsDTO() {

	}

	public ReportedPostsDTO(Integer pid, String reason) {
		super();
		this.pid = pid;
		this.reason = reason;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

}
