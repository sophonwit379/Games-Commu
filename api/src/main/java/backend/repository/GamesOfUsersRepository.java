package backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import backend.model.GamesOfUsers;

@Repository
public interface GamesOfUsersRepository extends CrudRepository<GamesOfUsers, Integer> {

}
