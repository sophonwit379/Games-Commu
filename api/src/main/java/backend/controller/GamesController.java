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
import org.springframework.web.bind.annotation.RequestParam;
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

	@GetMapping("/games/all")
	public ResponseEntity<List<Games>> getAll() {
		return ResponseEntity.ok(gamesService.getAll());
	}
	
	@GetMapping("/games/all")
	public ResponseEntity<Games> getByGID(@RequestParam int gid) {
		return ResponseEntity.ok(gamesService.getByGID(gid));
	}

	@GetMapping("/games/notintag")
	public ResponseEntity<List<Games>> getNotGamesTagByUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		return ResponseEntity.ok(gamesService.getNotGamesTagByUser(u));
	}

	@PostMapping("/games/create")
	public ResponseEntity<Object> createGame(@RequestBody GamesDTO gdto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		if (u.getRoll().equals("Admin")) {
			Games g = gamesService.createGame(new Games(gdto.getName(), gdto.getYear()));
			return ResponseEntity.ok(g);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You is not Admin");
		}
	}
}
