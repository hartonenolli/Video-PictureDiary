package com.example.videopicturediary.controller;
import com.example.videopicturediary.model.Video;
import com.example.videopicturediary.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;

@RestController
@RequestMapping("/api")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @GetMapping("/videos")
    public List<Video> getAllVideos() {
        return videoService.getAllVideos();
    }

    @PostMapping("/videos")
    public Video createVideo(@RequestBody Video video) {
        // Placeholder implementation
        return videoService.createVideo(video);
    }

}
