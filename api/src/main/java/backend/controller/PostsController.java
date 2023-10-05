package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.Posts;
import backend.service.PostsService;

@RestController
@RequestMapping("/api")
public class PostsController {

	@Autowired
	private PostsService postsService;
	
	@GetMapping("/posts")
	public List<Posts> getAll(){
		return (List<Posts>) postsService.getAll();
	}
}
