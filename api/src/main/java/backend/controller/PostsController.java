package backend.controller;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import backend.dto.GamesWithPageDTO;
import backend.dto.PageDTO;
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

	@GetMapping("/posts")
	public List<Posts> getAll() {
		return (List<Posts>) postsService.getAll();
	}

	@GetMapping("/posts/user")
	public ResponseEntity<List<Posts>> getByTagOfUser(@RequestBody PageDTO page) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Page<Posts> postsPage = postsService.getByTagOfUser(currentUserEmail, page.getPage());
		List<Posts> postsList = postsPage.getContent();
		return ResponseEntity.ok(postsList);
	}
	
	@GetMapping("/posts/game")
	public ResponseEntity<List<Posts>> getByGame(@RequestBody GamesWithPageDTO gwp) {
		Page<Posts> postsPage = postsService.getByGame(gwp);
		List<Posts> postsList = postsPage.getContent();
		return ResponseEntity.ok(postsList);
	}

	@PostMapping("/posts/create")
	public void createPost(@RequestBody PostsDTO p) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		Games g = gamesService.getByNameAndYear(p.getGameName(), p.getGameYear());
		postsService.createPost(new Posts(g, u, p.getDetail(), Timestamp.from(Instant.now())));
	}

	@PutMapping("/posts/update")
	public void updatePost(@RequestBody PostsInfoDTO pf) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		Posts p = postsService.getByPID(pf.getPid());
		if (p.getUsers() == u) {
			p.setDetail(pf.getDetail());
			postsService.updatePost(p);
		}
	}
}
