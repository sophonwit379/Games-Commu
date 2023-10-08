package backend.dto;

public class ReplyCommentsDTO {
	
	private Integer pid;
	private Integer rid;
	private String detail;
	
	public ReplyCommentsDTO() {

	}
	
	public ReplyCommentsDTO(Integer pid, Integer rid, String detail) {
		this.pid = pid;
		this.rid = rid;
		this.detail = detail;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public Integer getRid() {
		return rid;
	}

	public void setRid(Integer rid) {
		this.rid = rid;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

}
