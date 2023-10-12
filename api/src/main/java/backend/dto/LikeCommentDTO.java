package backend.dto;

public class LikeCommentDTO {

	private Integer cid;

	public LikeCommentDTO() {

	}

	public LikeCommentDTO(Integer cid) {
		this.cid = cid;
	}

	public Integer getCid() {
		return cid;
	}

	public void setCid(Integer cid) {
		this.cid = cid;
	}

}
