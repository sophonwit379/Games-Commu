package backend.dro;

import java.util.List;
import java.util.stream.Collectors;

public class RequestedGamesDRO {

	private int rgid;
	private int uid;
	private String name;
	private String year;
	private String status;
	private String username;
	
	public static List<RequestedGamesDRO> convertToRequestedGamesDRO(List<Object> objects) {
		return objects.stream().map(obj -> {
			Object[] array = (Object[]) obj; // Assuming each object is an array

			RequestedGamesDRO requestedGame = new RequestedGamesDRO();
			requestedGame.setRgid((int) array[0]);
			requestedGame.setUid((int) array[1]);
			requestedGame.setName((String) array[2]);
			requestedGame.setYear((String) array[3]);
			requestedGame.setStatus((String) array[4]);
			requestedGame.setUsername((String) array[5]);

			return requestedGame;
		}).collect(Collectors.toList());
	}

	public RequestedGamesDRO() {

	}

	public RequestedGamesDRO(int rgid, int uid, String name, String year, String status, String username) {
		this.rgid = rgid;
		this.uid = uid;
		this.name = name;
		this.year = year;
		this.status = status;
		this.username = username;
	}

	public int getRgid() {
		return rgid;
	}

	public void setRgid(int rgid) {
		this.rgid = rgid;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
