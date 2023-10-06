package backend.dto;

public class PostsInfoDTO {
	
	private int pid;
	private String detail;
	
	public PostsInfoDTO() {
		
	}

	public PostsInfoDTO(int pid, String detail) {
		this.pid = pid;
		this.detail = detail;
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
}
