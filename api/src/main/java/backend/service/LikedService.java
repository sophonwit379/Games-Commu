package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Liked;
import backend.repository.LikedRepository;

@Service
public class LikedService {

	@Autowired
	private LikedRepository likedRepository;
	
	public List<Liked> getAll(){
		return (List<Liked>) likedRepository.findAll();
	}
}
