package backend.controller;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.dto.UserInfoDTO;
import backend.dto.UsersDTO;
import backend.model.Users;
import backend.service.UsersService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UsersController {

	@Autowired
	private UsersService usersService;

	@SuppressWarnings("rawtypes")
	@GetMapping("/users")
	public ResponseEntity getAll() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		if (u.getRoll().equals("Admin")) {
			return ResponseEntity.ok((List<Users>) usersService.getAll());
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You is not Admin");
		}
	}
	
	@SuppressWarnings("rawtypes")
	@GetMapping("/user")
	public ResponseEntity getByEmail() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		return ResponseEntity.ok(u);
	}

	@PostMapping("/users/create")
	public void createAccount(@RequestBody UsersDTO u) {
		usersService.createAccount(new Users(u.getEmail(), u.getPassword(), u.getUsername(), u.getName(),
				u.getSurname(), "Uesr", "Normal", Timestamp.from(Instant.now())));
	}

	@PutMapping("/users/update")
	public void updateAccount(@RequestBody UserInfoDTO u) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		usersService.updateAccount(currentUserEmail, u);
	}

}
