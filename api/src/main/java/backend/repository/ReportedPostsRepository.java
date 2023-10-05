package backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import backend.model.ReportedPosts;

@Repository
public interface ReportedPostsRepository extends CrudRepository<ReportedPosts, Integer> {

}
