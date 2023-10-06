package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.GamesOfUsers;
import backend.service.GamesOfUsersService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class GamesOfUsersController {

	@Autowired
	private GamesOfUsersService gamesOfUsersService;
	
	@GetMapping("/gamesofusers")
	public List<GamesOfUsers> getAll(){
		return (List<GamesOfUsers>) gamesOfUsersService.getAll();
	}
}
