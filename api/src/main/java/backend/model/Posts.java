package backend.model;
// Generated Sep 10, 2023, 2:06:15 PM by Hibernate Tools 6.1.7.Final

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Posts generated by hbm2java
 */

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@SuppressWarnings("rawtypes")
public class Posts implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer pid;
	private Games games;
	private Users users;
	private String detail;
	private Timestamp date;
	@JsonIgnore private Set reportedPostses = new HashSet(0);
	@JsonIgnore private Set imageses = new HashSet(0);
	@JsonIgnore private Set commentses = new HashSet(0);
	@JsonIgnore private Set likeds = new HashSet(0);

	public Posts() {
	}

	public Posts(Games games, Users users, String detail, Timestamp date) {
		this.games = games;
		this.users = users;
		this.detail = detail;
		this.date = date;
	}

	public Posts(Games games, Users users, String detail, Timestamp date, Set reportedPostses, Set imageses,
			Set commentses, Set likeds) {
		this.games = games;
		this.users = users;
		this.detail = detail;
		this.date = date;
		this.reportedPostses = reportedPostses;
		this.imageses = imageses;
		this.commentses = commentses;
		this.likeds = likeds;
	}

	public Integer getPid() {
		return this.pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public Games getGames() {
		return this.games;
	}

	public void setGames(Games games) {
		this.games = games;
	}

	public Users getUsers() {
		return this.users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public String getDetail() {
		return this.detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public Timestamp getDate() {
		return this.date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public Set getReportedPostses() {
		return this.reportedPostses;
	}

	public void setReportedPostses(Set reportedPostses) {
		this.reportedPostses = reportedPostses;
	}

	public Set getImageses() {
		return this.imageses;
	}

	public void setImageses(Set imageses) {
		this.imageses = imageses;
	}

	public Set getCommentses() {
		return this.commentses;
	}

	public void setCommentses(Set commentses) {
		this.commentses = commentses;
	}

	public Set getLikeds() {
		return this.likeds;
	}

	public void setLikeds(Set likeds) {
		this.likeds = likeds;
	}

}
