package backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import backend.model.Games;
import backend.model.Posts;
import backend.model.Users;

@Repository
public interface PostsRepository extends PagingAndSortingRepository<Posts, Integer> {
	
	
	@Query("from Posts p join p.commentses c join p.imageses i join p.likeds l")
	Page<Posts> findAllByPage(Pageable pageable);
	
	@Query("from Posts p join p.games g join g.gamesOfUserses gou where gou.users=:user")
	public Page<Posts> findByTagOfUser(@Param("user") Users user, Pageable pageable);
	
	@Query("from Posts p where p.games=:game")
	public Page<Posts> findByGame(@Param("game") Games game, Pageable pageable);
}
