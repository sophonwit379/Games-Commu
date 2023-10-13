package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import backend.model.RequestedGames;

@Repository
public interface RequestedGamesRepository extends PagingAndSortingRepository<RequestedGames, Integer> {

	@Query(value = "SELECT rg.rgid,rg.uid,rg.name,rg.year,rg.status,u.username "
			+ "FROM requested_games AS rg INNER JOIN users AS u ON rg.uid = u.uid ORDER BY rg.rgid DESC", nativeQuery = true)
	public List<Object> getAll();
	
	@Query(value = "SELECT rg.rgid,rg.uid,rg.name,rg.year,rg.status,u.username "
			+ "FROM requested_games AS rg INNER JOIN users AS u ON rg.uid = u.uid "
			+ "WHERE rg.status = 'Waiting for approval' ORDER BY rg.rgid DESC", nativeQuery = true)
	public List<Object> getAllWaiting();
}
