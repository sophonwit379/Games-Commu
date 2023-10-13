package backend.service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.dro.CommentsDRO;
import backend.dro.ReplyCommentsDRO;
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

	public Comments getByCID(int cid) {
		return commentsRepository.findById(cid).get();
	}

	public List<CommentsDRO> getCommentsOfPostWithPage(int pid, int page) {
		List<Object> o = commentsRepository.getCommentsOfPost(pid);
		List<CommentsDRO> c = CommentsDRO.convertToCommentsDRO(o);
		List<CommentsDRO> cc = new ArrayList<>();
		if (((page + 1) * 5) - 5 < c.size()) {
			for (int i = ((page + 1) * 5) - 5; i < (page + 1) * 5; i++) {
				if (i < c.size()) {
					cc.add(c.get(i));
				} else {
					return cc;
				}
			}
		} else {
			return cc;
		}
		return cc;
	}

	public List<ReplyCommentsDRO> getRepliesOfCommentWithPage(int rid, int page) {
		List<Object> o = commentsRepository.getRepliesOfComment(rid);
		List<ReplyCommentsDRO> r = ReplyCommentsDRO.convertToReplyCommentsDRO(o);
		List<ReplyCommentsDRO> rr = new ArrayList<>();
		if (((page + 1) * 5) - 5 < r.size()) {
			for (int i = ((page + 1) * 5) - 5; i < (page + 1) * 5; i++) {
				if (i < r.size()) {
					rr.add(r.get(i));
				} else {
					return rr;
				}
			}
		} else {
			return rr;
		}
		return rr;
	}

	public Comments createComment(String email, CommentsDTO cf) {
		Users u = usersRepository.findByEmail(email);
		Posts p = postsRepository.findById(cf.getPid()).get();
		Comments c = new Comments(p, u, cf.getDetail(), Timestamp.from(Instant.now()));
		commentsRepository.save(c);
		return c;
	}

	public Comments createReplyComment(String email, ReplyCommentsDTO rcf) {
		Users u = usersRepository.findByEmail(email);
		Comments c = commentsRepository.findById(rcf.getRid()).get();
		Comments rc = new Comments(c, u, rcf.getDetail(), Timestamp.from(Instant.now()));
		System.out.println(rc);
		commentsRepository.save(rc);
		return rc;
	}

	public void deleteComment(Comments c) {
		commentsRepository.delete(c);
	}
}
