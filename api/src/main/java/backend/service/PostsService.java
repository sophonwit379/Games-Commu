package backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.dro.PostsDRO;
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

	public Posts getByPID(int pid) {
		return postsRepository.findById(pid).get();
	}

	public List<PostsDRO> getAllWithPage(int page) {
		List<Object> o = postsRepository.getAll();
		List<PostsDRO> p = PostsDRO.convertToPostsDRO(o);
		List<PostsDRO> pp = new ArrayList<>();
		if (((page + 1) * 5) - 5 < p.size()) {
			for (int i = ((page + 1) * 5) - 5; i < (page + 1) * 5; i++) {
				if (i < p.size()) {
					pp.add(p.get(i));
				} else {
					return pp;
				}
			}
		} else {
			return pp;
		}
		return pp;
	}

	public List<PostsDRO> getByTagOfUser(String email, int page) {
		Users u = usersRepository.findByEmail(email);
		List<Object> o = postsRepository.getByTagOfUser(u.getUid());
		List<PostsDRO> p = PostsDRO.convertToPostsDRO(o);
		List<PostsDRO> pp = new ArrayList<>();
		if (((page + 1) * 5) - 5 < p.size()) {
			for (int i = ((page + 1) * 5) - 5; i < (page + 1) * 5; i++) {
				if (i < p.size()) {
					pp.add(p.get(i));
				} else {
					return pp;
				}
			}
		} else {
			return pp;
		}
		return pp;
	}

	public List<PostsDRO> getByGame(int gid, int page) {
		List<Object> o = postsRepository.getByGame(gid);
		List<PostsDRO> p = PostsDRO.convertToPostsDRO(o);
		List<PostsDRO> pp = new ArrayList<>();
		if (((page + 1) * 5) - 5 < p.size()) {
			for (int i = ((page + 1) * 5) - 5; i < (page + 1) * 5; i++) {
				if (i < p.size()) {
					pp.add(p.get(i));
				} else {
					return pp;
				}
			}
		} else {
			return pp;
		}
		return pp;
	}

	public Posts createPost(Posts p) {
		postsRepository.save(p);
		return p;
	}

	public void updatePost(Posts p) {
		postsRepository.save(p);
	}

	public void deletePost(Posts p) {
		postsRepository.delete(p);
	}
}
