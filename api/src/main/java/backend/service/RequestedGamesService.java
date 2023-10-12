package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.dto.RequestedGamesDTO;
import backend.model.Games;
import backend.model.RequestedGames;
import backend.repository.GamesRepository;
import backend.repository.RequestedGamesRepository;

@Service
public class RequestedGamesService {

	@Autowired
	private RequestedGamesRepository requestedGamesRepository;
	@Autowired
	private GamesRepository gamesRepository;

	public List<RequestedGames> getAll() {
		return (List<RequestedGames>) requestedGamesRepository.findAll();
	}

	public void approve(RequestedGamesDTO rgf) {
		RequestedGames rg = requestedGamesRepository.findById(rgf.getRgid()).get();
		rg.setStatus("Approved");
		Games g = new Games(rgf.getName(), rgf.getYear());
		gamesRepository.save(g);
		requestedGamesRepository.save(rg);
	}

	public void reject(RequestedGamesDTO rgf) {
		RequestedGames rg = requestedGamesRepository.findById(rgf.getRgid()).get();
		rg.setStatus("Rejected");
		requestedGamesRepository.save(rg);
	}

	public void createRequestedGames(RequestedGames rg) {
		requestedGamesRepository.save(rg);
	}
}
