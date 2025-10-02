package com.example.videopicturediary.service;
import com.example.videopicturediary.model.Video;
import java.util.List;

import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class VideoService {
    public List<Video> getAllVideos() {
        // Placeholder implementation
        List<Video> videos = new ArrayList<>();
        Video video1 = new Video();
        video1.setId(1L);
        video1.setTitle("Sample Video 1");
        video1.setUrl("http://example.com/video1.mp4");
        videos.add(video1);
        return videos;
    }
}
