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

	@Query(value = "SELECT gou.guid, gou.uid, gou.gid, g.name, g.year "
			+ "FROM games_of_users AS gou INNER JOIN games AS g ON gou.gid = g.gid WHERE gou.uid = :uid", nativeQuery = true)
	public List<Object> getByUser(@Param("uid") int uid);

	@Query("SELECT gou FROM GamesOfUsers gou JOIN FETCH gou.users u JOIN FETCH gou.games g WHERE u = :user")
	public List<GamesOfUsers> findByUser(@Param("user") Users user);

	@Query("from GamesOfUsers gou where gou.users=:user and gou.games=:game")
	public GamesOfUsers findByGameAndUser(@Param("game") Games game, @Param("user") Users user);
}
