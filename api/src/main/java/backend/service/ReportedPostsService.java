package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.dto.ReportedPostsDTO;
import backend.model.Posts;
import backend.model.ReportedPosts;
import backend.model.Users;
import backend.repository.PostsRepository;
import backend.repository.ReportedPostsRepository;
import backend.repository.UsersRepository;

@Service
public class ReportedPostsService {

	@Autowired
	private ReportedPostsRepository reportedPostsRepository;
	@Autowired
	private UsersRepository usersRepository;
	@Autowired
	private PostsRepository postsRepository;
	
	public List<ReportedPosts> getAll(){
		return (List<ReportedPosts>) reportedPostsRepository.findAll();
	}
	
	public void report(String email,ReportedPostsDTO rpf){
		Users u = usersRepository.findByEmail(email);
		Posts p = postsRepository.findById(rpf.getPid()).get();
		ReportedPosts rp = new ReportedPosts(p, u, rpf.getReason(), "Waiting for process");
		reportedPostsRepository.save(rp);
	}
}
