package backend.service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.dto.CommentsDTO;
import backend.dto.ReplyCommentsDTO;
import backend.model.Comments;
import backend.model.Posts;
import backend.model.Users;
import backend.repository.CommentsRepository;
import backend.repository.PostsRepository;
import backend.repository.UsersRepository;

@Service
public class CommentsService {

	@Autowired
	private CommentsRepository commentsRepository;
	@Autowired
	private UsersRepository usersRepository;
	@Autowired
	private PostsRepository postsRepository;
	
	public List<Comments> getAll(){
		return (List<Comments>) commentsRepository.findAll();
	}	
	
	public void createComment(String email,CommentsDTO cf){
		Users u = usersRepository.findByEmail(email);
		Posts p = postsRepository.findById(cf.getPid()).get();
		Comments c = new Comments(p,u,cf.getDetail(),Timestamp.from(Instant.now()));
		commentsRepository.save(c);
	}
	
	public void createReplyComment(String email,ReplyCommentsDTO rcf){
		Users u = usersRepository.findByEmail(email);
		Posts p = postsRepository.findById(rcf.getPid()).get();
		Comments c = commentsRepository.findById(rcf.getRid()).get();
		Comments rc = new Comments(p,c,u,rcf.getDetail(),Timestamp.from(Instant.now()));
		commentsRepository.save(rc);
	}
}
