package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.dro.RequestedGamesDRO;
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

	public List<RequestedGamesDRO> getAll() {
		List<Object> o = requestedGamesRepository.getAll();
		List<RequestedGamesDRO> rp = RequestedGamesDRO.convertToRequestedGamesDRO(o);
		return rp;
	}
	
	public List<RequestedGamesDRO> getAllWaiting() {
		List<Object> o = requestedGamesRepository.getAllWaiting();
		List<RequestedGamesDRO> rp = RequestedGamesDRO.convertToRequestedGamesDRO(o);
		return rp;
	}

	public RequestedGames getByID(int rpid) {
		return requestedGamesRepository.findById(rpid).get();
	}

	public int approve(RequestedGamesDTO rgf) {
		RequestedGames rg = requestedGamesRepository.findById(rgf.getRgid()).get();
		rg.setStatus("Approved");
		Games g = new Games(rgf.getName(), rgf.getYear());
		gamesRepository.save(g);
		requestedGamesRepository.save(rg);
		return g.getGid();
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
