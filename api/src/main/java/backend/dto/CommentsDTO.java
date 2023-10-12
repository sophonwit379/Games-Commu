package backend.dto;

public class CommentsDTO {

	private Integer pid;
	private String detail;

	public CommentsDTO() {

	}

	public CommentsDTO(Integer pid, String detail) {
		this.pid = pid;
		this.detail = detail;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

}
