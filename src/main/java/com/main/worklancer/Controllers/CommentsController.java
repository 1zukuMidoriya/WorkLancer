package com.main.worklancer.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.main.worklancer.Models.Comments;
import com.main.worklancer.Models.Project;
import com.main.worklancer.Models.User;
import com.main.worklancer.Repositories.CommentRepository;
import com.main.worklancer.Repositories.ProjectRepository;
import com.main.worklancer.Repositories.UserRepository;

@RestController
@CrossOrigin("*")

public class CommentsController {

    @Autowired
    UserRepository userRepo;

    @Autowired
    CommentRepository commentRepo;

    @Autowired
    ProjectRepository projectRepo;

    @GetMapping("/Comments/{project_id}")
    ResponseEntity<List<Comments>> GetAllComments(@PathVariable int project_id) {
        Project project = projectRepo.findById(project_id).orElse(null);
        if(project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(project.getComments(), HttpStatus.OK);
    }

    @PostMapping("/Comments/{project_id}")
    ResponseEntity<Project> addComment(@PathVariable int project_id, @RequestBody Comments comment) {
        Project project = projectRepo.findById(project_id).orElse(null);
        if(project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        if(comment.getUser() != null && comment.getUser().getId() > 0) {
            User user = userRepo.findById(comment.getUser().getId()).orElse(null);
            comment.setUser(user);
        }
        
        comment.setProject(project);
        commentRepo.save(comment);
        return new ResponseEntity<>(project, HttpStatus.CREATED);
    }

}
