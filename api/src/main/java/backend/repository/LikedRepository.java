package backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import backend.model.Liked;

@Repository
public interface LikedRepository extends CrudRepository<Liked, Integer> {

}
