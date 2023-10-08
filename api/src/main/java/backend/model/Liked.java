package backend.model;
// Generated Oct 6, 2023, 8:07:22 PM by Hibernate Tools 6.1.7.Final

/**
 * Liked generated by hbm2java
 */
public class Liked implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer lid;
	private Posts posts;
	private Comments comments;
	private Users users;

	public Liked() {
	}

	public Liked(Users users) {
		this.users = users;
	}

	public Liked(Posts posts, Comments comments, Users users) {
		this.posts = posts;
		this.comments = comments;
		this.users = users;
	}

	public Liked(Comments comments, Users users) {
		this.comments = comments;
		this.users = users;
	}

	public Liked(Posts posts, Users users) {
		super();
		this.posts = posts;
		this.users = users;
	}

	public Integer getLid() {
		return this.lid;
	}

	public void setLid(Integer lid) {
		this.lid = lid;
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

}
