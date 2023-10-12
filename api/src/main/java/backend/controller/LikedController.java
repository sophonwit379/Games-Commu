package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.dto.LikeCommentDTO;
import backend.dto.LikePostDTO;
import backend.model.Liked;
import backend.service.LikedService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class LikedController {

	@Autowired
	private LikedService likedService;

	@GetMapping("/likes")
	public List<Liked> getAll() {
		return (List<Liked>) likedService.getAll();
	}

	@PostMapping("/likes/likepost")
	public void likePost(@RequestBody LikePostDTO lp) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		likedService.likePost(lp.getPid(), currentUserEmail);
	}

	@PostMapping("/likes/likecomment")
	public void likeComment(@RequestBody LikeCommentDTO lc) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		likedService.likeComment(lc.getCid(), currentUserEmail);
	}

	@DeleteMapping("/likes/unlikepost")
	public void unlikePost(@RequestBody LikePostDTO lp) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		likedService.unlikePost(lp.getPid(), currentUserEmail);
	}

	@DeleteMapping("/likes/unlikecomment")
	public void unlikeComment(@RequestBody LikeCommentDTO lc) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		likedService.unlikeComment(lc.getCid(), currentUserEmail);
	}
}
