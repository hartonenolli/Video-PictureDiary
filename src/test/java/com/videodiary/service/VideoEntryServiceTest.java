package com.videodiary.service;

import com.videodiary.entity.VideoEntry;
import com.videodiary.repository.VideoEntryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application.properties")
@Transactional
class VideoEntryServiceTest {

    @Autowired
    private VideoEntryService videoEntryService;

    @Autowired
    private VideoEntryRepository videoEntryRepository;

    @BeforeEach
    void setUp() {
        videoEntryRepository.deleteAll();
    }

    @Test
    void testGetAllVideoEntries() {
        // Given
        VideoEntry video1 = new VideoEntry("Test Video 1", "Description 1", "/path1", "video1.mp4", 1024L, "video/mp4");
        VideoEntry video2 = new VideoEntry("Test Video 2", "Description 2", "/path2", "video2.mp4", 2048L, "video/mp4");
        videoEntryRepository.save(video1);
        videoEntryRepository.save(video2);

        // When
        List<VideoEntry> videos = videoEntryService.getAllVideoEntries();

        // Then
        assertEquals(2, videos.size());
        assertEquals("Test Video 1", videos.get(1).getTitle()); // Ordered by created date desc
        assertEquals("Test Video 2", videos.get(0).getTitle());
    }

    @Test
    void testGetVideoEntryById() {
        // Given
        VideoEntry video = new VideoEntry("Test Video", "Description", "/path", "video.mp4", 1024L, "video/mp4");
        VideoEntry savedVideo = videoEntryRepository.save(video);

        // When
        Optional<VideoEntry> result = videoEntryService.getVideoEntryById(savedVideo.getId());

        // Then
        assertTrue(result.isPresent());
        assertEquals("Test Video", result.get().getTitle());
    }

    @Test
    void testSearchVideoEntries() {
        // Given
        VideoEntry video1 = new VideoEntry("Holiday Video", "Summer vacation", "/path1", "holiday.mp4", 1024L, "video/mp4");
        VideoEntry video2 = new VideoEntry("Work Meeting", "Team standup", "/path2", "meeting.mp4", 2048L, "video/mp4");
        VideoEntry video3 = new VideoEntry("Holiday Photos", "Winter vacation", "/path3", "photos.mp4", 3072L, "video/mp4");
        videoEntryRepository.save(video1);
        videoEntryRepository.save(video2);
        videoEntryRepository.save(video3);

        // When
        List<VideoEntry> results = videoEntryService.searchVideoEntries("holiday");

        // Then
        assertEquals(2, results.size());
        assertTrue(results.stream().anyMatch(v -> v.getTitle().equals("Holiday Video")));
        assertTrue(results.stream().anyMatch(v -> v.getTitle().equals("Holiday Photos")));
    }

    @Test
    void testUpdateVideoEntry() {
        // Given
        VideoEntry video = new VideoEntry("Original Title", "Original Description", "/path", "video.mp4", 1024L, "video/mp4");
        VideoEntry savedVideo = videoEntryRepository.save(video);

        // When
        VideoEntry updatedVideo = videoEntryService.updateVideoEntry(savedVideo.getId(), "Updated Title", "Updated Description");

        // Then
        assertEquals("Updated Title", updatedVideo.getTitle());
        assertEquals("Updated Description", updatedVideo.getDescription());
        assertEquals(savedVideo.getId(), updatedVideo.getId());
    }

    @Test
    void testUpdateVideoEntryNotFound() {
        // When & Then
        assertThrows(RuntimeException.class, () -> {
            videoEntryService.updateVideoEntry(999L, "Title", "Description");
        });
    }
}