package backend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import backend.model.Users;

@Repository
public interface UsersRepository extends CrudRepository<Users, Integer> {

	@Query("from Users u where u.email=:email")
	public Users findByEmail(@Param("email") String email);
}
