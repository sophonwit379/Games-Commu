package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import backend.model.Comments;
import backend.model.Games;
import backend.model.Images;
import backend.model.Posts;
import backend.model.Users;

@Repository
public interface ImagesRepository extends PagingAndSortingRepository<Images, Integer> {
	@Query("SELECT i FROM Images i JOIN FETCH i.games g JOIN FETCH i.posts p JOIN FETCH i.comments c JOIN FETCH i.users u where i.games=:game")
	public List<Images> findByGames(@Param("game") Games game);

	@Query("from Images i JOIN FETCH i.posts p where i.posts=:post")
	public List<Images> findByPosts(@Param("post") Posts post);

	@Query("from Images i JOIN FETCH i.comments c where i.comments=:comment")
	public List<Images> findByComments(@Param("comment") Comments comment);

	@Query("from Images i JOIN FETCH i.users u where i.users=:user")
	public List<Images> findByUsers(@Param("user") Users user);

	@Query(value = "SELECT COUNT(*) FROM images WHERE images.gid=:gid", nativeQuery = true)
	public int countByGID(@Param("gid") int gid);

	@Query(value = "SELECT COUNT(*) FROM images WHERE images.pid=:pid", nativeQuery = true)
	public int countByPID(@Param("pid") int pid);

	@Query(value = "SELECT COUNT(*) FROM images WHERE images.cid=:cid", nativeQuery = true)
	public int countByCID(@Param("cid") int cid);

	@Query(value = "SELECT COUNT(*) FROM images WHERE images.uid=:uid", nativeQuery = true)
	public int countByUID(@Param("uid") int uid);
}
