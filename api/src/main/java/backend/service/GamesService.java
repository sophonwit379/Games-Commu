package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Games;
import backend.repository.GamesRepository;

@Service
public class GamesService {

	@Autowired
	private GamesRepository gamesRepository;
	
	public List<Games> getAll(){
		return (List<Games>) gamesRepository.findAll();
	}	
	
	public Games getByNameAndYear(String name,String year){
		return gamesRepository.findByNameAndYear(name,year);
	}
	
	public void createGame(Games g){
		gamesRepository.save(g);
	}
	
	
}
