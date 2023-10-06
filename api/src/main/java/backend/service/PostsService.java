package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Posts;
import backend.repository.PostsRepository;

@Service
public class PostsService {

	@Autowired
	private PostsRepository postsRepository;
	
	public List<Posts> getAll(){
		return (List<Posts>) postsRepository.findAll();
	}
	
	public Posts getByPID(int pid){
		return postsRepository.findById(pid).get();
	}
	
	public void createPost(Posts p){
		postsRepository.save(p);
	}
	
	public void updatePost(Posts p){
		postsRepository.save(p);
	}
}
