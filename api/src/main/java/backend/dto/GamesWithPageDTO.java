package backend.dto;

public class GamesWithPageDTO {

	private String name;
	private String year;
	private int page;

	public GamesWithPageDTO() {

	}

	public GamesWithPageDTO(String name, String year, int page) {
		this.name = name;
		this.year = year;
		this.page = page;
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

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}
}
