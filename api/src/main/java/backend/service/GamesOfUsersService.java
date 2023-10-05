package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.GamesOfUsers;
import backend.repository.GamesOfUsersRepository;

@Service
public class GamesOfUsersService {

	@Autowired
	private GamesOfUsersRepository gamesOfUsersRepository;
	
	public List<GamesOfUsers> getAll(){
		return (List<GamesOfUsers>) gamesOfUsersRepository.findAll();
	}	
}
