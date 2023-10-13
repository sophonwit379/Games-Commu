package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

import backend.dto.LikeCommentDTO;
import backend.dto.LikePostDTO;
import backend.service.LikedService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class LikedController {

	@Autowired
	private LikedService likedService;

	@GetMapping("/likes/count/post")
	public ResponseEntity<Integer> countLikeInPost(@RequestParam int pid) {
		return ResponseEntity.ok(likedService.countLikeInPost(pid));
	}
	
	@GetMapping("/likes/count/comment")
	public ResponseEntity<Integer> countLikeInComment(@RequestParam int cid) {
		return ResponseEntity.ok(likedService.countLikeInComment(cid));
	}

	@PostMapping("/likes/likepost")
	public ResponseEntity<String> likePost(@RequestBody LikePostDTO lp) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		likedService.likePost(lp.getPid(), currentUserEmail);
		return ResponseEntity.ok("Like post successfully");
	}

	@PostMapping("/likes/likecomment")
	public ResponseEntity<String> likeComment(@RequestBody LikeCommentDTO lc) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		likedService.likeComment(lc.getCid(), currentUserEmail);
		return ResponseEntity.ok("Like comment successfully");
	}

	@DeleteMapping("/likes/unlikepost")
	public ResponseEntity<String> unlikePost(@RequestBody LikePostDTO lp) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		likedService.unlikePost(lp.getPid(), currentUserEmail);
		return ResponseEntity.ok("Unlike post successfully");
	}

	@DeleteMapping("/likes/unlikecomment")
	public ResponseEntity<String> unlikeComment(@RequestBody LikeCommentDTO lc) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		likedService.unlikeComment(lc.getCid(), currentUserEmail);
		return ResponseEntity.ok("Unlike comment successfully");
	}
}
