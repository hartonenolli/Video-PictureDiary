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
        Video video2 = new Video();
        video2.setId(2L);
        video2.setTitle("Sample Video 2");
        video2.setUrl("http://example.com/video2.mp4");
        videos.add(video1);
        videos.add(video2);
        return videos;
    }
}
