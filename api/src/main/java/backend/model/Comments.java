package backend.model;
// Generated Oct 6, 2023, 8:07:22 PM by Hibernate Tools 6.1.7.Final

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Comments generated by hbm2java
 */
public class Comments implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer cid;
	private Posts posts;
	private Comments comments;
	private Users users;
	private String detail;
	private Timestamp date;
	@SuppressWarnings("rawtypes")
	@JsonIgnore
	private Set imageses = new HashSet(0);
	@SuppressWarnings("rawtypes")
	@JsonIgnore
	private Set commentses = new HashSet(0);
	@SuppressWarnings("rawtypes")
	@JsonIgnore
	private Set likeds = new HashSet(0);

	public Comments() {
	}

	public Comments(Posts posts, Users users, String detail, Timestamp date) {
		this.posts = posts;
		this.users = users;
		this.detail = detail;
		this.date = date;
	}
	
	public Comments(Posts posts, Comments comments, Users users, String detail, Timestamp date) {
		super();
		this.posts = posts;
		this.comments = comments;
		this.users = users;
		this.detail = detail;
		this.date = date;
	}

	@SuppressWarnings("rawtypes")
	public Comments(Posts posts, Comments comments, Users users, String detail, Timestamp date, Set imageses,
			Set commentses, Set likeds) {
		this.posts = posts;
		this.comments = comments;
		this.users = users;
		this.detail = detail;
		this.date = date;
		this.imageses = imageses;
		this.commentses = commentses;
		this.likeds = likeds;
	}

	public Integer getCid() {
		return this.cid;
	}

	public void setCid(Integer cid) {
		this.cid = cid;
	}

	public Posts getPosts() {
		return this.posts;
	}

	public void setPosts(Posts posts) {
		this.posts = posts;
	}

	public Comments getComments() {
		return this.comments;
	}

	public void setComments(Comments comments) {
		this.comments = comments;
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

	@SuppressWarnings("rawtypes")
	public Set getImageses() {
		return this.imageses;
	}

	@SuppressWarnings("rawtypes")
	public void setImageses(Set imageses) {
		this.imageses = imageses;
	}

	@SuppressWarnings("rawtypes")
	public Set getCommentses() {
		return this.commentses;
	}

	@SuppressWarnings("rawtypes")
	public void setCommentses(Set commentses) {
		this.commentses = commentses;
	}

	@SuppressWarnings("rawtypes")
	public Set getLikeds() {
		return this.likeds;
	}

	@SuppressWarnings("rawtypes")
	public void setLikeds(Set likeds) {
		this.likeds = likeds;
	}

}
