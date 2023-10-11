package backend.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import backend.model.RequestedGames;

@Repository
public interface RequestedGamesRepository extends PagingAndSortingRepository<RequestedGames, Integer>{

}
