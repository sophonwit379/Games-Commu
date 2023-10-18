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
	
	public PostsDRO getPostByPID(int pid) {
		List<Object> o = postsRepository.getByPID(pid);
		List<PostsDRO> p = PostsDRO.convertToPostsDRO(o);
		return p.get(0);
	}
	
	public int getMaxPageOfAll() {
		int count = postsRepository.countAll();
		System.out.println(count);
		int maxPage = count/5 + 1;
		System.out.println(maxPage);
		return maxPage;
	}
	
	public int getMaxPageOfTagOfUser(int uid) {
		int count = postsRepository.countByTagOfUser(uid);
		System.out.println(count);
		int maxPage = count/5 + 1;
		System.out.println(maxPage);
		return maxPage;
	}
	
	public int getMaxPageOfGame(int gid) {
		int count = postsRepository.countByGame(gid);
		System.out.println(count);
		int maxPage = count/5 + 1;
		System.out.println(maxPage);
		return maxPage;
	}
	
	public int getMaxPageOfSearch(String search) {
		int count = postsRepository.countBySearch(search);
		System.out.println(count);
		int maxPage = count/5 + 1;
		System.out.println(maxPage);
		return maxPage;
	}
	
	public int getMaxPageOfUser(int uid) {
		int count = postsRepository.countByUser(uid);
		System.out.println(count);
		int maxPage = count/5 + 1;
		System.out.println(maxPage);
		return maxPage;
	}
	
	public int getMaxPageOfComment(int uid) {
		int count = postsRepository.countByComment(uid);
		System.out.println(count);
		int maxPage = count/5 + 1;
		System.out.println(maxPage);
		return maxPage;
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
	
	public List<PostsDRO> getBySearch(String search, int page) {
		List<Object> o = postsRepository.getBySearch(search);
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
	
	public List<PostsDRO> getByUser(String email, int page) {
		Users u = usersRepository.findByEmail(email);
		List<Object> o = postsRepository.getByUser(u.getUid());
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
	
	public List<PostsDRO> getByComment(String email, int page) {
		Users u = usersRepository.findByEmail(email);
		List<Object> o = postsRepository.getByComment(u.getUid());
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
