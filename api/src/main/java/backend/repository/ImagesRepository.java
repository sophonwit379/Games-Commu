package backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import backend.model.Images;

@Repository
public interface ImagesRepository extends CrudRepository<Images, Integer> {

}
