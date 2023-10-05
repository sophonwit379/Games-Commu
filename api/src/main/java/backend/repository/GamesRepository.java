package backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import backend.model.Games;

@Repository
public interface GamesRepository extends CrudRepository<Games, Integer> {

}
