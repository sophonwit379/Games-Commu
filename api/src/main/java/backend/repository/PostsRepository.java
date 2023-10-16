package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import backend.model.Posts;

@Repository
public interface PostsRepository extends PagingAndSortingRepository<Posts, Integer> {

	@Query(value = "SELECT p.pid,p.uid,p.gid,p.detail,p.date,u.username "
			+ "FROM posts AS p INNER JOIN users AS u ON p.uid = u.uid ORDER BY p.date DESC", nativeQuery = true)
	public List<Object> getAll();

	@Query(value = "SELECT count(*) FROM posts AS p", nativeQuery = true)
	public int countAll();

	@Query(value = "SELECT p.pid,p.uid,p.gid,p.detail,p.date,u.username "
			+ "FROM posts AS p INNER JOIN users AS u ON p.uid = u.uid INNER JOIN games AS g ON p.gid = g.gid "
			+ "INNER JOIN games_of_users AS gou ON g.gid = gou.gid WHERE gou.uid = :uid ORDER BY p.date DESC", nativeQuery = true)
	public List<Object> getByTagOfUser(@Param("uid") int uid);

	@Query(value = "SELECT count(*) "
			+ "FROM posts AS p INNER JOIN users AS u ON p.uid = u.uid INNER JOIN games AS g ON p.gid = g.gid "
			+ "INNER JOIN games_of_users AS gou ON g.gid = gou.gid WHERE gou.uid = :uid", nativeQuery = true)
	public int countByTagOfUser(@Param("uid") int uid);

	@Query(value = "SELECT p.pid,p.uid,p.gid,p.detail,p.date,u.username "
			+ "FROM posts AS p INNER JOIN users AS u ON p.uid = u.uid "
			+ "WHERE p.gid = :gid ORDER BY p.date DESC", nativeQuery = true)
	public List<Object> getByGame(@Param("gid") int gid);

	@Query(value = "SELECT count(*) FROM posts AS p WHERE p.gid = :gid", nativeQuery = true)
	public int countByGame(@Param("gid") int gid);

	@Query(value = "SELECT p.pid,p.uid,p.gid,p.detail,p.date,u.username "
			+ "FROM posts AS p INNER JOIN users AS u ON p.uid = u.uid "
			+ "WHERE p.detail LIKE %:search% ORDER BY p.date DESC", nativeQuery = true)
	public List<Object> getBySearch(@Param("search") String search);

	@Query(value = "SELECT count(*) FROM posts AS p INNER JOIN users AS u ON p.uid = u.uid "
			+ "WHERE p.detail LIKE %:search%", nativeQuery = true)
	public int countBySearch(@Param("search") String search);

	@Query(value = "SELECT p.pid,p.uid,p.gid,p.detail,p.date,u.username "
			+ "FROM posts AS p INNER JOIN users AS u ON p.uid = u.uid "
			+ "WHERE p.uid = :uid ORDER BY p.date DESC", nativeQuery = true)
	public List<Object> getByUser(@Param("uid") int uid);

	@Query(value = "SELECT count(*) FROM posts AS p INNER JOIN users AS u ON p.uid = u.uid "
			+ "WHERE p.uid = :uid ORDER BY p.date DESC", nativeQuery = true)
	public int countByUser(@Param("uid") int uid);
	
	@Query(value = "SELECT DISTINCT p.pid,p.uid,p.gid,p.detail,p.date,u.username "
			+ "FROM posts AS p INNER JOIN users AS u ON p.uid = u.uid "
			+ "INNER JOIN comments AS c ON p.pid = c.pid "
			+ "WHERE c.uid = :uid ORDER BY p.date DESC;", nativeQuery = true)
	public List<Object> getByComment(@Param("uid") int uid);
	
	@Query(value = "SELECT COUNT(DISTINCT p.pid) AS count "
			+ "FROM posts AS p INNER JOIN users AS u ON p.uid = u.uid "
			+ "INNER JOIN comments AS c ON p.pid = c.pid "
			+ "WHERE c.uid = :uid ORDER BY p.date DESC;", nativeQuery = true)
	public int countByComment(@Param("uid") int uid);
}
