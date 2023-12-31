package backend.model;
// Generated Oct 13, 2023, 3:35:49 PM by Hibernate Tools 6.1.7.Final

/**
 * RequestedGames generated by hbm2java
 */
public class RequestedGames implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer rgid;
	private Users users;
	private String name;
	private String year;
	private String status;

	public RequestedGames() {
	}

	public RequestedGames(Users users, String name, String status) {
		this.users = users;
		this.name = name;
		this.status = status;
	}

	public RequestedGames(Users users, String name, String year, String status) {
		this.users = users;
		this.name = name;
		this.year = year;
		this.status = status;
	}

	public Integer getRgid() {
		return this.rgid;
	}

	public void setRgid(Integer rgid) {
		this.rgid = rgid;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getYear() {
		return this.year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
