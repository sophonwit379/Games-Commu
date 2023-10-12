package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import backend.dto.GamesWithPageDTO;
import backend.model.Games;
import backend.model.Posts;
import backend.model.Users;
import backend.repository.GamesRepository;
import backend.repository.PostsRepository;
import backend.repository.UsersRepository;

@Service
public class PostsService {

	@Autowired
	private PostsRepository postsRepository;
	@Autowired
	private UsersRepository usersRepository;
	@Autowired
	private GamesRepository gamesRepository;
	
	public List<Posts> getAll(){
		return (List<Posts>) postsRepository.findAll();
	}
	
	public Posts getByPID(int pid){
		return postsRepository.findById(pid).get();
	}
	
	public Page<Posts> getAllByPage(int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return postsRepository.findAllByPage(pageable);
    }
	
	public Page<Posts> getByTagOfUser(String email,int page) {
		Users u = usersRepository.findByEmail(email);
        Pageable pageable = PageRequest.of(page, 5);
        return postsRepository.findByTagOfUser(u, pageable);
    }
	
	public Page<Posts> getByGame(GamesWithPageDTO gwp) {
        Pageable pageable = PageRequest.of(gwp.getPage(), 5);
        Games g = gamesRepository.findByNameAndYear(gwp.getName(), gwp.getYear());
        return postsRepository.findByGame(g, pageable);
    }
	
	public void createPost(Posts p){
		postsRepository.save(p);
	}
	
	public void updatePost(Posts p){
		postsRepository.save(p);
	}
}
