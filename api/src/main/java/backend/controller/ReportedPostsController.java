package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.dto.ReportedPostsDTO;
import backend.model.Posts;
import backend.model.ReportedPosts;
import backend.model.Users;
import backend.service.PostsService;
import backend.service.ReportedPostsService;
import backend.service.UsersService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportedPostsController {

	@Autowired
	private ReportedPostsService reportedPostsService;
	@Autowired
	private PostsService postsService;
	@Autowired
	private UsersService usersService;

	@GetMapping("/reportedposts")
	public ResponseEntity<Object> getAll() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		if (u.getRoll().equals("Admin")) {
			return ResponseEntity.ok(reportedPostsService.getAll());
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You is not Admin");
		}
	}
	
	@GetMapping("/reportedposts/waiting")
	public ResponseEntity<Object> getAllWaiting() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		if (u.getRoll().equals("Admin")) {
			return ResponseEntity.ok(reportedPostsService.getAllWaiting());
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You is not Admin");
		}
	}

	@PostMapping("/reportedposts/report")
	public ResponseEntity<String> report(@RequestBody ReportedPostsDTO rpdto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		reportedPostsService.report(currentUserEmail, rpdto.getPid(), rpdto.getReason());
		return ResponseEntity.ok("Report successfully");
	}

	@DeleteMapping("/reportedposts/deletepost")
	public ResponseEntity<String> deletePostFromReport(@RequestParam int rpid) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		ReportedPosts rp = reportedPostsService.getByID(rpid);
		Posts p = rp.getPosts();
		if (u.getRoll().equals("Admin")) {
			postsService.deletePost(p);
			return ResponseEntity.ok("Delete post from report successfully");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You is not Admin");
		}
	}
}
