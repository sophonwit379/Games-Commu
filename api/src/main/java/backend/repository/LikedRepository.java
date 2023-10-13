package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import backend.model.Comments;
import backend.model.Liked;
import backend.model.Posts;
import backend.model.Users;

@Repository
public interface LikedRepository extends CrudRepository<Liked, Integer> {

	@Query(value = "SELECT COUNT(*) FROM liked WHERE pid = :pid", nativeQuery = true)
	public int countLikeInPost(@Param("pid") int pid);
	
	@Query(value = "SELECT COUNT(*) FROM liked WHERE cid = :cid", nativeQuery = true)
	public int countLikeInComment(@Param("cid") int cid);

	@Query("from Liked l where l.users=:user")
	public List<Liked> findByUser(@Param("user") Users user);

	@Query("from Liked l where l.posts=:post")
	public List<Liked> findByPost(@Param("post") Posts post);

	@Query("from Liked l where l.comments=:comment")
	public List<Liked> findByComment(@Param("comment") Comments comment);

	@Query("from Liked l where l.posts=:post and l.users=:user")
	public Liked findByUserAndPost(@Param("user") Users user, @Param("post") Posts post);

	@Query("from Liked l where l.comments=:comment and l.users=:user")
	public Liked findByUserAndComment(@Param("user") Users user, @Param("comment") Comments comment);
}
