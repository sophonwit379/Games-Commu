package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import backend.model.Comments;

@Repository
public interface CommentsRepository extends PagingAndSortingRepository<Comments, Integer> {

	@Query(value = "SELECT c.cid, c.uid, c.pid, c.detail, c.date, u.username "
			+ "FROM comments AS c INNER JOIN users AS u ON c.uid = u.uid "
			+ "WHERE c.pid = :pid ORDER BY c.date DESC", nativeQuery = true)
	public List<Object> getCommentsOfPost(@Param("pid") int pid);

	@Query(value = "SELECT c.cid, c.uid, c.rid, c.detail, c.date, u.username "
			+ "FROM comments AS c INNER JOIN users AS u ON c.uid = u.uid "
			+ "WHERE c.rid = :rid ORDER BY c.date DESC", nativeQuery = true)
	public List<Object> getRepliesOfComment(@Param("rid") int rid);

}
