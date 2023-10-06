package backend.controller;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.dto.UsersDTO;
import backend.model.Users;
import backend.service.UsersService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UsersController {

	@Autowired
	private UsersService usersService;
	
	@GetMapping("/users")
	public List<Users> getAll(){
		return (List<Users>) usersService.getAll();
	}
	
	@PostMapping("/users/create")
	public void createAccount(@RequestBody UsersDTO u){
		usersService.updateAccount(new Users(u.getEmail(),u.getPassword(),u.getUsername(),u.getName(),u.getSurname(),"Uesr","Normal",Timestamp.from(Instant.now())));
	}
	
	@PutMapping("/users/create")
	public void updateAccount(@RequestBody UsersDTO u){
		usersService.updateAccount(new Users());
	}
}
