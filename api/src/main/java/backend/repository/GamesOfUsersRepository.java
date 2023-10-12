package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import backend.model.Games;
import backend.model.GamesOfUsers;
import backend.model.Users;

@Repository
public interface GamesOfUsersRepository extends CrudRepository<GamesOfUsers, Integer> {
	@Query("SELECT gou FROM GamesOfUsers gou JOIN FETCH gou.users u JOIN FETCH gou.games g WHERE u = :user")
	public List<GamesOfUsers> findByUser(@Param("user") Users user);

	@Query("from GamesOfUsers gou where gou.users=:user and gou.games=:game")
	public GamesOfUsers findByGameAndUser(@Param("game") Games game, @Param("user") Users user);
}
