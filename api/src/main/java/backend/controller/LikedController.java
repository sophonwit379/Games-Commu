package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.Liked;
import backend.service.LikedService;

@RestController
@RequestMapping("/api")
public class LikedController {

	@Autowired
	private LikedService likedService;
	
	@GetMapping("/liked")
	public List<Liked> getAll(){
		return (List<Liked>) likedService.getAll();
	}
}
