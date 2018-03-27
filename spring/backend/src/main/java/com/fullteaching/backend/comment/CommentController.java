package com.fullteaching.backend.comment;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fullteaching.backend.entry.Entry;
import com.fullteaching.backend.entry.EntryRepository;
import com.fullteaching.backend.security.AuthorizationService;
import com.fullteaching.backend.coursedetails.CourseDetails;
import com.fullteaching.backend.coursedetails.CourseDetailsRepository;
import com.fullteaching.backend.user.User;
import com.fullteaching.backend.user.UserComponent;

@RestController
@RequestMapping("/api-comments")
public class CommentController {
	
	@Autowired
	private EntryRepository entryRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private CourseDetailsRepository courseDetailsRepository;
	
	@Autowired
	private UserComponent user;
	
	@Autowired
	private AuthorizationService authorizationService;
	
	@RequestMapping(value = "/entry/{entryId}/forum/{courseDetailsId}", method = RequestMethod.POST)
	public ResponseEntity<Object> newComment(
			@RequestBody Comment comment, 
			@PathVariable(value="entryId") String entryId, 
			@PathVariable(value="courseDetailsId") String courseDetailsId
	) {
		
		ResponseEntity<Object> authorized = authorizationService.checkBackendLogged();
		if (authorized != null){
			return authorized;
		};
		
		long id_entry = -1;
		long id_courseDetails = -1;
		try {
			id_entry = Long.parseLong(entryId);
			id_courseDetails = Long.parseLong(courseDetailsId);
		} catch(NumberFormatException e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		Optional<CourseDetails> ocd = courseDetailsRepository.findById(id_courseDetails);
		CourseDetails cd = ocd.get();
		
		ResponseEntity<Object> userAuthorized = authorizationService.checkAuthorizationUsers(cd, cd.getCourse().getAttenders());
		if (userAuthorized != null) { // If the user is not an attender of the course
			return userAuthorized;
		} else {
		
			//Setting the author of the comment
			User userLogged = user.getLoggedUser();
			comment.setUser(userLogged);
			//Setting the date of the comment
			comment.setDate(System.currentTimeMillis());
			
			//The comment is a root comment
			if (comment.getCommentParent() == null){
				Optional<Entry> o_entry = entryRepository.findById(id_entry);
				Entry entry = o_entry.get();
				
				if(entry != null){
					entry.getComments().add(comment);
					/*Saving the modified entry: Cascade relationship between entry and comments
					  will add the new comment to CommentRepository*/
					entryRepository.save(entry);
					/*Entire entry is returned*/
					return new ResponseEntity<>(entry, HttpStatus.CREATED);
				}else{
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
			}
			
			//The comment is a replay to another existing comment
			else{
				Optional<Comment> o_cParent = commentRepository.findById(comment.getCommentParent().getId());
				Comment cParent = o_cParent.get();
				if(cParent != null){
					cParent.getReplies().add(comment);
					/*Saving the modified parent comment: Cascade relationship between comment and 
					 its replies will add the new comment to CommentRepository*/
					commentRepository.save(cParent);
					Optional<Entry> o_entry = entryRepository.findById(id_entry);
					Entry entry = o_entry.get();
					/*Entire entry is returned*/
					return new ResponseEntity<>(entry, HttpStatus.CREATED);
				}else{
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
			}
		}
	}

}
