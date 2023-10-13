package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.dro.ReportedPostsDRO;
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

	public List<ReportedPostsDRO> getAll() {
		List<Object> o = reportedPostsRepository.getAll();
		List<ReportedPostsDRO> rp = ReportedPostsDRO.convertToReportedPostsDRO(o);
		return rp;
	}
	
	public List<ReportedPostsDRO> getAllWaiting() {
		List<Object> o = reportedPostsRepository.getAllWaiting();
		List<ReportedPostsDRO> rp = ReportedPostsDRO.convertToReportedPostsDRO(o);
		return rp;
	}
	
	public ReportedPosts getByID(int rpid) {
		return reportedPostsRepository.findById(rpid).get();
	}

	public void report(String email, int pid, String reason) {
		Users u = usersRepository.findByEmail(email);
		Posts p = postsRepository.findById(pid).get();
		ReportedPosts rp = new ReportedPosts(p, u, reason, "Waiting for process");
		reportedPostsRepository.save(rp);
	}
}
