package backend.dto;

public class LikePostDTO {
	
	private Integer pid;

	public LikePostDTO() {

	}

	public LikePostDTO(Integer pid) {
		this.pid = pid;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

}
