package backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Comments;
import backend.model.Liked;
import backend.model.Posts;
import backend.model.Users;
import backend.repository.CommentsRepository;
import backend.repository.LikedRepository;
import backend.repository.PostsRepository;
import backend.repository.UsersRepository;

@Service
public class LikedService {

	@Autowired
	private LikedRepository likedRepository;
	@Autowired
	private UsersRepository usersRepository;
	@Autowired
	private PostsRepository postsRepository;
	@Autowired
	private CommentsRepository commentsRepository;

	public int countLikeInPost(int pid) {
		return likedRepository.countLikeInPost(pid);
	}
	
	public int countLikeInComment(int cid) {
		return likedRepository.countLikeInComment(cid);
	}

	public void likePost(int pid, String email) {
		Users u = usersRepository.findByEmail(email);
		Posts p = postsRepository.findById(pid).get();
		Liked l = new Liked(p, u);
		if (likedRepository.findByUserAndPost(u, p) == null) {
			likedRepository.save(l);
		}
	}

	public void unlikePost(int pid, String email) {
		Users u = usersRepository.findByEmail(email);
		Posts p = postsRepository.findById(pid).get();
		if (likedRepository.findByUserAndPost(u, p) != null) {
			Liked l = likedRepository.findByUserAndPost(u, p);
			likedRepository.delete(l);
		}
	}

	public void likeComment(int cid, String email) {
		Users u = usersRepository.findByEmail(email);
		Comments c = commentsRepository.findById(cid).get();
		Liked l = new Liked(c, u);
		if (likedRepository.findByUserAndComment(u, c) == null) {
			likedRepository.save(l);
		}
	}

	public void unlikeComment(int cid, String email) {
		Users u = usersRepository.findByEmail(email);
		Comments c = commentsRepository.findById(cid).get();
		if (likedRepository.findByUserAndComment(u, c) != null) {
			Liked l = likedRepository.findByUserAndComment(u, c);
			likedRepository.delete(l);
		}
	}
}
