package backend.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import backend.model.Comments;

@Repository
public interface CommentsRepository extends PagingAndSortingRepository<Comments, Integer> {

}
