package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.ReportedPosts;
import backend.repository.ReportedPostsRepository;

@Service
public class ReportedPostsService {

	@Autowired
	private ReportedPostsRepository reportedPostsRepository;
	
	public List<ReportedPosts> getAll(){
		return (List<ReportedPosts>) reportedPostsRepository.findAll();
	}
}
