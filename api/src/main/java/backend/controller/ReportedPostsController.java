package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
