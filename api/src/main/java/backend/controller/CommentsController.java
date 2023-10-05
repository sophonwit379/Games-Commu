package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.Comments;
import backend.service.CommentsService;

@RestController
@RequestMapping("/api")
public class CommentsController {
	
	@Autowired
	private CommentsService commentsService;
	
	@GetMapping("/comments")
	public List<Comments> getAll(){
		return (List<Comments>) commentsService.getAll();
	}
}
