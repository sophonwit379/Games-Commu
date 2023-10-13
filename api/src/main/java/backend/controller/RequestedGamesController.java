package backend.controller;

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
	public ResponseEntity<Object> getAll() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		if (u.getRoll().equals("Admin")) {
			return ResponseEntity.ok(requestedGamesService.getAll());
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You is not Admin");
		}	
	}
	
	@GetMapping("/requestedgames/waiting")
	public ResponseEntity<Object> getAllWaiting() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		if (u.getRoll().equals("Admin")) {
			return ResponseEntity.ok(requestedGamesService.getAllWaiting());
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You is not Admin");
		}	
	}

	@PostMapping("/requestedgames/create")
	public ResponseEntity<String> createRequestedGame(@RequestBody GamesDTO g) {
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

	@PostMapping("/requestedgames/approve")
	public ResponseEntity<Object> approve(@RequestBody RequestedGamesDTO rgf) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		if (u.getRoll().equals("Admin")) {
			int gid = requestedGamesService.approve(rgf);
			return ResponseEntity.ok(gid);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You is not Admin");
		}
	}

	@PostMapping("/requestedgames/reject")
	public ResponseEntity<String> reject(@RequestBody RequestedGamesDTO rgf) {
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
