package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Images;
import backend.repository.ImagesRepository;

@Service
public class ImagesService {

	@Autowired
	private ImagesRepository imagesRepository;
	
	public List<Images> getAll(){
		return (List<Images>) imagesRepository.findAll();
	}
}
