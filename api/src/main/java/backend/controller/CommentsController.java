package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.dto.CommentsDTO;
import backend.dto.ReplyCommentsDTO;
import backend.model.Comments;
import backend.service.CommentsService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentsController {
	
	@Autowired
	private CommentsService commentsService;
	
	@GetMapping("/comments")
	public List<Comments> getAll(){
		return (List<Comments>) commentsService.getAll();
	}
	
	@GetMapping("/comments/main")
	public List<Comments> getMainComments(){
		return (List<Comments>) commentsService.getAll();
	}
	
	@GetMapping("/comments/replycomments")
	public List<Comments> getReplyComments(){
		return (List<Comments>) commentsService.getAll();
	}
	
	@PostMapping("/comments/create")
	public void createComment(@RequestBody CommentsDTO cf){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		commentsService.createComment(currentUserEmail, cf);
	}
	
	@PostMapping("/comments/reply")
	public void createReplyComment(@RequestBody ReplyCommentsDTO rcf){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		commentsService.createReplyComment(currentUserEmail, rcf);
	}
}
