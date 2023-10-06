package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.dto.GamesDTO;
import backend.model.Games;
import backend.model.GamesOfUsers;
import backend.model.Users;
import backend.repository.GamesOfUsersRepository;
import backend.repository.GamesRepository;
import backend.repository.UsersRepository;

@Service
public class GamesOfUsersService {

	@Autowired
	private GamesOfUsersRepository gamesOfUsersRepository;
	@Autowired
	private GamesRepository gamesRepository;
	@Autowired
	private UsersRepository usersRepository;

	public List<GamesOfUsers> getAll() {
		return (List<GamesOfUsers>) gamesOfUsersRepository.findAll();
	}

	public List<GamesOfUsers> getByUser(String email) {
		Users u = usersRepository.findByEmail(email);
		return (List<GamesOfUsers>) gamesOfUsersRepository.findByUser(u);
	}

	public void createTag(String email, GamesDTO gf) {
		Games g = gamesRepository.findByNameAndYear(gf.getName(), gf.getYear());
		Users u = usersRepository.findByEmail(email);
		GamesOfUsers gou = new GamesOfUsers(g, u);
		if (gamesOfUsersRepository.findByGameAndUser(g, u) == null) {
			gamesOfUsersRepository.save(gou);
		}
	}

	public void deleteTag(String email, GamesDTO gf) {
		Games g = gamesRepository.findByNameAndYear(gf.getName(), gf.getYear());
		Users u = usersRepository.findByEmail(email);
		if (gamesOfUsersRepository.findByGameAndUser(g, u) != null) {
			GamesOfUsers gou = gamesOfUsersRepository.findByGameAndUser(g, u);
			gamesOfUsersRepository.delete(gou);
		}
	}
}
