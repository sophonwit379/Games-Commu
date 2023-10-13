package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import backend.model.ReportedPosts;

@Repository
public interface ReportedPostsRepository extends CrudRepository<ReportedPosts, Integer> {

	@Query(value = "SELECT rp.rpid, rp.pid, rp.uid, rp.reason, rp.status, u.username "
			+ "FROM reported_posts AS rp INNER JOIN users AS u ON rp.uid = u.uid ORDER BY rp.rpid DESC", nativeQuery = true)
	public List<Object> getAll();
	
	@Query(value = "SELECT rp.rpid, rp.pid, rp.uid, rp.reason, rp.status, u.username "
			+ "FROM reported_posts AS rp INNER JOIN users AS u ON rp.uid = u.uid "
			+ "WHERE rp.status = 'Waiting for process' ORDER BY rp.rpid DESC", nativeQuery = true)
	public List<Object> getAllWaiting();

	@Query(value = "SELECT rp.rpid, rp.pid, rp.uid, rp.reason, rp.status, u.username "
			+ "FROM reported_posts AS rp INNER JOIN users AS u ON rp.uid = u.uid "
			+ "WHERE rp.rpid = :rpid", nativeQuery = true)
	public List<Object> getByID(@Param("rpid") int rpid);

}
