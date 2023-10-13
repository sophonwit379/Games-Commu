package backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Games;
import backend.model.GamesOfUsers;
import backend.model.Users;
import backend.repository.GamesOfUsersRepository;
import backend.repository.GamesRepository;

@Service
public class GamesService {

	@Autowired
	private GamesOfUsersRepository gamesOfUsersRepository;
	@Autowired
	private GamesRepository gamesRepository;

	public List<Games> getAll() {
		return (List<Games>) gamesRepository.findAll();
	}

	public List<Games> getNotGamesTagByUser(Users u) {
		List<Games> g = (List<Games>) gamesRepository.findAll();
		List<GamesOfUsers> gou = gamesOfUsersRepository.findByUser(u);

		List<Games> tag = gou.stream().map(GamesOfUsers::getGames).collect(Collectors.toList());

		g.removeAll(tag);
		return g;
	}

	public Games getByNameAndYear(String name, String year) {
		return gamesRepository.findByNameAndYear(name, year);
	}

	public Games createGame(Games g) {
		gamesRepository.save(g);
		return g;
	}

}
