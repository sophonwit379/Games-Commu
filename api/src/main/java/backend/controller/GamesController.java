package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.Games;
import backend.service.GamesService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class GamesController {

	@Autowired
	private GamesService gamesService;
	
	@GetMapping("/games")
	public List<Games> getAll(){
		return (List<Games>) gamesService.getAll();
	}
}
