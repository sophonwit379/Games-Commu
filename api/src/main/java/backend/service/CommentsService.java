package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Comments;
import backend.repository.CommentsRepository;

@Service
public class CommentsService {

	@Autowired
	private CommentsRepository commentsRepository;
	
	public List<Comments> getAll(){
		return (List<Comments>) commentsRepository.findAll();
	}	
}
