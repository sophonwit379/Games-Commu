package backend.controller;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.dro.CommentsDRO;
import backend.dro.ReplyCommentsDRO;
import backend.dto.CommentsDTO;
import backend.dto.ReplyCommentsDTO;
import backend.model.Comments;
import backend.model.Users;
import backend.service.CommentsService;
import backend.service.UsersService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentsController {

	@Autowired
	private CommentsService commentsService;
	@Autowired
	private UsersService usersService;

	@GetMapping("/comments/post")
	public ResponseEntity<List<CommentsDRO>> getCommentsOfPostWithPage(@RequestParam int pid, @RequestParam int page) {
		List<CommentsDRO> c = commentsService.getCommentsOfPostWithPage(pid, page);
		return ResponseEntity.ok(c);
	}

	@GetMapping("/comments/comment")
	public ResponseEntity<List<ReplyCommentsDRO>> getRepliesOfCommentWithPage(@RequestParam int rid,
			@RequestParam int page) {
		List<ReplyCommentsDRO> rc = commentsService.getRepliesOfCommentWithPage(rid, page);
		return ResponseEntity.ok(rc);
	}

	@PostMapping("/comments/create")
	public ResponseEntity<Integer> createComment(@RequestBody CommentsDTO cf) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Comments c = commentsService.createComment(currentUserEmail, cf);
		return ResponseEntity.ok(c.getCid());
	}

	@PostMapping("/comments/reply")
	public ResponseEntity<Integer> createReplyComment(@RequestBody ReplyCommentsDTO rcf) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Comments rc = commentsService.createReplyComment(currentUserEmail, rcf);
		return ResponseEntity.ok(rc.getCid());
	}

	@DeleteMapping("/comments/delete")
	public ResponseEntity<String> deleteComment(@RequestParam int cid) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		Users u = usersService.getByEmail(currentUserEmail);
		Comments c = commentsService.getByCID(cid);
		if (u.getRoll().equals("Admin") || u.getUid() == c.getUsers().getUid()) {
			commentsService.deleteComment(c);
			return ResponseEntity.ok("Delete successfully");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You is not own post");
		}
	}
}
