package backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import backend.model.Posts;
import backend.model.Users;

@Repository
public interface PostsRepository extends PagingAndSortingRepository<Posts, Integer> {
	@Query("from Posts p join p.games g join g.gamesOfUserses gou where gou.users=:user")
	public Page<Posts> findByTagOfUser(@Param("user") Users user, Pageable pageable);
}
