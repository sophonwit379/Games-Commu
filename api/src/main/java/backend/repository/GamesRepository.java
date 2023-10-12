package backend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import backend.model.Games;

@Repository
public interface GamesRepository extends CrudRepository<Games, Integer> {
	@Query("from Games g where g.name=:name and g.year=:year")
	public Games findByNameAndYear(@Param("name") String name, @Param("year") String year);
}
