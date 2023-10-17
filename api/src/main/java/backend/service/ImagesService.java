package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Comments;
import backend.model.Games;
import backend.model.Images;
import backend.model.Posts;
import backend.model.Users;
import backend.repository.CommentsRepository;
import backend.repository.GamesRepository;
import backend.repository.ImagesRepository;
import backend.repository.PostsRepository;
import backend.repository.UsersRepository;

@Service
public class ImagesService {

	@Autowired
	private ImagesRepository imagesRepository;
	@Autowired
	private UsersRepository usersRepository;
	@Autowired
	private PostsRepository postsRepository;
	@Autowired
	private GamesRepository gamesRepository;
	@Autowired
	private CommentsRepository commentsRepository;

	public List<Images> getAll() {
		return (List<Images>) imagesRepository.findAll();
	}

	public List<Images> getByGID(int gid) {
		Games g = gamesRepository.findById(gid).get();
		return (List<Images>) imagesRepository.findByGames(g);
	}

	public List<Images> getByPID(int pid) {
		Posts p = postsRepository.findById(pid).get();
		return (List<Images>) imagesRepository.findByPosts(p);
	}

	public List<Images> getByCID(int cid) {
		Comments c = commentsRepository.findById(cid).get();
		return (List<Images>) imagesRepository.findByComments(c);
	}

	public List<Images> getByEmail(String email) {
		Users u = usersRepository.findByEmail(email);
		return (List<Images>) imagesRepository.findByUsers(u);
	}

	public int countByGID(int gid) {
		return imagesRepository.countByGID(gid);
	}

	public int countByPID(int pid) {
		return imagesRepository.countByPID(pid);
	}

	public int countByCID(int cid) {
		return imagesRepository.countByCID(cid);
	}

	public int countByEmail(String email) {
		Users u = usersRepository.findByEmail(email);
		return imagesRepository.countByUID(u.getUid());
	}

	public void createImageForGame(int gid, String path) {
		Games g = gamesRepository.findById(gid).get();
		Images i = new Images(g, path);
		imagesRepository.save(i);
	}

	public void createImageForPost(int pid, String path) {
		Posts p = postsRepository.findById(pid).get();
		Images i = new Images(p, path);
		imagesRepository.save(i);
	}

	public void createImageForComment(int cid, String path) {
		Comments c = commentsRepository.findById(cid).get();
		Images i = new Images(c, path);
		imagesRepository.save(i);
	}

	public void createImageForUser(String email, String path) {
		Users u = usersRepository.findByEmail(email);
		Images i = new Images(u, path);
		imagesRepository.save(i);
	}
	
	public void updateImageForUser(String email, String path) {
		Users u = usersRepository.findByEmail(email);
		List<Images> old = imagesRepository.findByUsers(u);
		Images i = old.get(0);
		i.setPath(path);
		imagesRepository.save(i);
	}
}
