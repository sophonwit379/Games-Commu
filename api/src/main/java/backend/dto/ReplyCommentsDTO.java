package backend.dto;

public class ReplyCommentsDTO {

	private Integer rid;
	private String detail;

	public ReplyCommentsDTO() {

	}

	public ReplyCommentsDTO(Integer rid, String detail) {
		this.rid = rid;
		this.detail = detail;
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
