package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import backend.model.Posts;
import backend.model.Users;
import backend.repository.PostsRepository;
import backend.repository.UsersRepository;

@Service
public class PostsService {

	@Autowired
	private PostsRepository postsRepository;
	@Autowired
	private UsersRepository usersRepository;
	
	public List<Posts> getAll(){
		return (List<Posts>) postsRepository.findAll();
	}
	
	public Posts getByPID(int pid){
		return postsRepository.findById(pid).get();
	}
	
	public Page<Posts> getByTagOfUser(String email,int page) {
		Users u = usersRepository.findByEmail(email);
        Pageable pageable = PageRequest.of(page, 5);
        return postsRepository.findByTagOfUser(u, pageable);
    }
	
	public void createPost(Posts p){
		postsRepository.save(p);
	}
	
	public void updatePost(Posts p){
		postsRepository.save(p);
	}
}
