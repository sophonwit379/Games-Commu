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
import backend.dto.RequestedGamesDTO;
import backend.model.RequestedGames;
import backend.model.Users;
import backend.service.RequestedGamesService;
import backend.service.UsersService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class RequestedGamesController {

	@Autowired
	private RequestedGamesService requestedGamesService;
	@Autowired
	private UsersService usersService;

	@GetMapping("/requestedgames")
	public ResponseEntity<List<RequestedGames>> getAll() {
		return ResponseEntity.ok(requestedGamesService.getAll());
	}

	@SuppressWarnings("rawtypes")
	@PostMapping("/requestedgames/create")
	public ResponseEntity createRequestedGame(@RequestBody GamesDTO g) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		RequestedGames rg;
		if (g.getYear().equals("0"))
			rg = new RequestedGames(u, g.getName(), "Waiting for approval");
		else
			rg = new RequestedGames(u, g.getName(), g.getYear(), "Waiting for approval");
		requestedGamesService.createRequestedGames(rg);
		return ResponseEntity.ok("Request sent successfully");
	}

	@SuppressWarnings("rawtypes")
	@PostMapping("/requestedgames/approve")
	public ResponseEntity approve(@RequestBody RequestedGamesDTO rgf) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		if (u.getRoll().equals("Admin")) {
			requestedGamesService.approve(rgf);
			return ResponseEntity.ok("Approve successfully");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You is not Admin");
		}
	}
	
	@SuppressWarnings("rawtypes")
	@PostMapping("/requestedgames/reject")
	public ResponseEntity reject(@RequestBody RequestedGamesDTO rgf) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		if (u.getRoll().equals("Admin")) {
			requestedGamesService.reject(rgf);
			return ResponseEntity.ok("Reject successfully");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You is not Admin");
		}
	}
}
