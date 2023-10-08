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

import backend.dto.ReportedPostsDTO;
import backend.model.ReportedPosts;
import backend.service.ReportedPostsService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportedPostsController {

	@Autowired
	private ReportedPostsService reportedPostsService;
	
	@GetMapping("/reportedposts")
	public List<ReportedPosts> getAll(){
		return (List<ReportedPosts>) reportedPostsService.getAll();
	}
	
	@PostMapping("/reportedposts/report")
	public void report(@RequestBody ReportedPostsDTO rpf){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		reportedPostsService.report(currentUserEmail, rpf);
	}
}
