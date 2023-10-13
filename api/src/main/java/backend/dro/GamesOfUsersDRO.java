package backend.dro;

import java.util.List;
import java.util.stream.Collectors;

public class GamesOfUsersDRO {

	private int guid;
	private int uid;
	private int gid;
	private String name;
	private String year;
	
	public static List<GamesOfUsersDRO> convertToGamesOfUsersDRO(List<Object> objects) {
		return objects.stream().map(obj -> {
			Object[] array = (Object[]) obj; // Assuming each object is an array

			GamesOfUsersDRO gamesOfUser = new GamesOfUsersDRO();
			gamesOfUser.setGuid((int) array[0]);
			gamesOfUser.setUid((int) array[1]);
			gamesOfUser.setGid((int) array[2]);
			gamesOfUser.setName((String) array[3]);
			gamesOfUser.setYear((String) array[4]);

			return gamesOfUser;
		}).collect(Collectors.toList());
	}

	public GamesOfUsersDRO() {
		
	}

	public GamesOfUsersDRO(int guid, int uid, int gid, String name, String year) {
		this.guid = guid;
		this.uid = uid;
		this.gid = gid;
		this.name = name;
		this.year = year;
	}

	public int getGuid() {
		return guid;
	}

	public void setGuid(int guid) {
		this.guid = guid;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
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
