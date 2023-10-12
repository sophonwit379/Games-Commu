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
			+ "FROM posts AS p INNER JOIN users AS u ON p.uid = u.uid ORDER BY p.date DESC;",nativeQuery = true)
	public List<Object> getAll();
	
	@Query(value = "SELECT p.pid,p.uid,p.gid,p.detail,p.date,u.username "
			+ "FROM posts AS p INNER JOIN users AS u ON p.uid = u.uid "
			+ "INNER JOIN games AS g ON p.gid = g.gid "
			+ "INNER JOIN games_of_users AS gou ON g.gid = gou.gid "
			+ "WHERE gou.uid = :uid ORDER BY p.date DESC;",nativeQuery = true)
	public List<Object> getByTagOfUser(@Param("uid") int uid);
	
	@Query(value = "SELECT p.pid,p.uid,p.gid,p.detail,p.date,u.username "
			+ "FROM posts AS p INNER JOIN users AS u ON p.uid = u.uid "
			+ "WHERE p.gid = :gid ORDER BY p.date DESC;",nativeQuery = true)
	public List<Object> getByGame(@Param("gid") int gid);
	
}
