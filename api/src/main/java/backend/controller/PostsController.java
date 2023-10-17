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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.dro.PostsDRO;
import backend.dto.PostsDTO;
import backend.dto.PostsInfoDTO;
import backend.model.Games;
import backend.model.Posts;
import backend.model.Users;
import backend.service.GamesService;
import backend.service.PostsService;
import backend.service.UsersService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PostsController {

	@Autowired
	private PostsService postsService;
	@Autowired
	private UsersService usersService;
	@Autowired
	private GamesService gamesService;
	
	@GetMapping("/posts/notlogin/count")
	public ResponseEntity<Integer> getMaxPageOfAll() {
		return ResponseEntity.ok(postsService.getMaxPageOfAll());
	}
	
	@GetMapping("/posts/tag/count")
	public ResponseEntity<Integer> getMaxPageOfTagOfUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		return ResponseEntity.ok(postsService.getMaxPageOfTagOfUser(u.getUid()));
	}
	
	@GetMapping("/posts/game/count")
	public ResponseEntity<Integer> getMaxPageOfGame(@RequestParam int gid) {
		return ResponseEntity.ok(postsService.getMaxPageOfGame(gid));
	}
	
	@GetMapping("/posts/search/count")
	public ResponseEntity<Integer> getMaxPageOfSearch(@RequestParam String search) {
		return ResponseEntity.ok(postsService.getMaxPageOfSearch(search));
	}
	
	@GetMapping("/posts/user/count")
	public ResponseEntity<Integer> getMaxPageOfUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		return ResponseEntity.ok(postsService.getMaxPageOfUser(u.getUid()));
	}
	
	@GetMapping("/posts/comment/count")
	public ResponseEntity<Integer> getMaxPageOfComment() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		return ResponseEntity.ok(postsService.getMaxPageOfComment(u.getUid()));
	}
	
	@GetMapping("/posts/post")
	public ResponseEntity<Posts> getByPID(@RequestParam int pid) {
		Posts p = postsService.getByPID(pid);
		return ResponseEntity.ok(p);
	}

	@GetMapping("/posts/notlogin")
	public ResponseEntity<List<PostsDRO>> getAllByPage(@RequestParam int page) {
		List<PostsDRO> p = postsService.getAllWithPage(page);
		return ResponseEntity.ok(p);
	}

	@GetMapping("/posts/tag")
	public ResponseEntity<List<PostsDRO>> getByTagOfUser(@RequestParam int page) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		List<PostsDRO> p = postsService.getByTagOfUser(currentUserEmail, page);
		return ResponseEntity.ok(p);
	}

	@GetMapping("/posts/game")
	public ResponseEntity<List<PostsDRO>> getByGame(@RequestParam int gid, @RequestParam int page) {
		List<PostsDRO> p = postsService.getByGame(gid, page);
		return ResponseEntity.ok(p);
	}
	
	@GetMapping("/posts/search")
	public ResponseEntity<List<PostsDRO>> getBySearch(@RequestParam String search, @RequestParam int page) {
		List<PostsDRO> p = postsService.getBySearch(search, page);
		return ResponseEntity.ok(p);
	}
	
	@GetMapping("/posts/user")
	public ResponseEntity<List<PostsDRO>> getByUser(@RequestParam int page) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		List<PostsDRO> p = postsService.getByUser(currentUserEmail, page);
		return ResponseEntity.ok(p);
	}
	
	@GetMapping("/posts/comment")
	public ResponseEntity<List<PostsDRO>> getByComment(@RequestParam int page) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		List<PostsDRO> p = postsService.getByComment(currentUserEmail, page);
		return ResponseEntity.ok(p);
	}

	@PostMapping("/posts/create")
	public ResponseEntity<Integer> createPost(@RequestBody PostsDTO pdto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		Games g = gamesService.getByNameAndYear(pdto.getGameName(), pdto.getGameYear());
		Posts p = postsService.createPost(new Posts(g, u, pdto.getDetail(), Timestamp.from(Instant.now())));
		return ResponseEntity.ok(p.getPid());
	}

	@PutMapping("/posts/update")
	public ResponseEntity<String> updatePost(@RequestBody PostsInfoDTO pf) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		Posts p = postsService.getByPID(pf.getPid());
		if (p.getUsers() == u) {
			p.setDetail(pf.getDetail());
			p.setDate(Timestamp.from(Instant.now()));
			postsService.updatePost(p);
			return ResponseEntity.ok("Update post successfully");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not match");
	}

	@DeleteMapping("/posts/delete")
	public ResponseEntity<String> deletePost(@RequestParam int pid) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		Posts p = postsService.getByPID(pid);
		if (u.getRoll().equals("Admin") || u.getUid() == p.getUsers().getUid()) {
			postsService.deletePost(p);
			return ResponseEntity.ok("Delete successfully");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You is not own post");
		}
	}
}
