package backend.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import backend.model.Posts;

@Repository
public interface PostsRepository extends PagingAndSortingRepository<Posts, Integer> {

}
