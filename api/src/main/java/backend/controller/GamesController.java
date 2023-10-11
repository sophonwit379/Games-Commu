package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.dto.GamesDTO;
import backend.model.Games;
import backend.model.Users;
import backend.service.GamesService;
import backend.service.UsersService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class GamesController {

	@Autowired
	private GamesService gamesService;
	@Autowired
	private UsersService usersService;
	
	@GetMapping("/games")
	public List<Games> getAll(){
		return (List<Games>) gamesService.getAll();
	}
	
	@GetMapping("/games/notintag")
	public List<Games> getNotGamesTagByUser(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		return (List<Games>) gamesService.getNotGamesTagByUser(u);
	}
	
	@SuppressWarnings("rawtypes")
	@PostMapping("/games/create")
	public ResponseEntity createGame(@RequestBody GamesDTO g){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		if (u.getRoll().equals("Admin")) {
			gamesService.createGame(new Games(g.getName(),g.getYear()));
			return ResponseEntity.ok("Game added");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You is not Admin");
		}
	}
}
