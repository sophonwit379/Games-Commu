package backend.dto;

public class GamesDTO {
	
	private String name;
	private String year;
	
	public GamesDTO() {

	}
	
	public GamesDTO(String name, String year) {
		this.name = name;
		this.year = year;
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
