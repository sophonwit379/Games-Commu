package backend.dto;

public class PostsDTO {

	private String gameName;
	private String gameYear;
	private String detail;
	
	public PostsDTO() {

	}

	public PostsDTO(String gameName, String gameYear, String detail) {
		this.gameName = gameName;
		this.gameYear = gameYear;
		this.detail = detail;
	}
	
	public String getGameName() {
		return gameName;
	}
	public void setGameName(String gameName) {
		this.gameName = gameName;
	}
	public String getGameYear() {
		return gameYear;
	}
	public void setGameYear(String gameYear) {
		this.gameYear = gameYear;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
}
