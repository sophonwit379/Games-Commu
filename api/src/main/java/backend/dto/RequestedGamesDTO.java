package backend.dto;

public class RequestedGamesDTO {

	private int rgid;
	private String name;
	private String year;

	public RequestedGamesDTO() {

	}

	public RequestedGamesDTO(int rgid, String name, String year) {
		this.rgid = rgid;
		this.name = name;
		this.year = year;
	}

	public int getRgid() {
		return rgid;
	}

	public void setRgid(int rgid) {
		this.rgid = rgid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}
}
