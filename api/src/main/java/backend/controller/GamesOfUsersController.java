package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.dto.GamesDTO;
import backend.model.GamesOfUsers;
import backend.service.GamesOfUsersService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class GamesOfUsersController {

	@Autowired
	private GamesOfUsersService gamesOfUsersService;

	@GetMapping("/gamesofusers")
	public List<GamesOfUsers> getAll() {
		return (List<GamesOfUsers>) gamesOfUsersService.getAll();
	}

	@GetMapping("/gamesofuser")
	public List<GamesOfUsers> getByUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		return (List<GamesOfUsers>) gamesOfUsersService.getByUser(currentUserEmail);
	}

	@PostMapping("/gamesofuser/create")
	public void createTag(@RequestBody GamesDTO g) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		gamesOfUsersService.createTag(currentUserEmail, g);
	}

	@DeleteMapping("/gamesofuser/delete")
	public void deleteTag(@RequestBody GamesDTO g) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		gamesOfUsersService.deleteTag(currentUserEmail, g);
	}
}
