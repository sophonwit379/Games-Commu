package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.Images;
import backend.service.ImagesService;

@RestController
@RequestMapping("/api")
public class ImagesController {

	@Autowired
	private ImagesService imagesService;
	
	@GetMapping("/images")
	public List<Images> getAll(){
		return (List<Images>) imagesService.getAll();
	}
}
