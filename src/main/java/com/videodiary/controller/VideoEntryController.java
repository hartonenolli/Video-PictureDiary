package com.videodiary.controller;

import com.videodiary.entity.VideoEntry;
import com.videodiary.service.VideoEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class VideoEntryController {
    
    @Autowired
    private VideoEntryService videoEntryService;
    
    @GetMapping
    public ResponseEntity<List<VideoEntry>> getAllVideoEntries() {
        List<VideoEntry> videoEntries = videoEntryService.getAllVideoEntries();
        return ResponseEntity.ok(videoEntries);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<VideoEntry> getVideoEntryById(@PathVariable Long id) {
        Optional<VideoEntry> videoEntry = videoEntryService.getVideoEntryById(id);
        return videoEntry.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<VideoEntry>> searchVideoEntries(@RequestParam String title) {
        List<VideoEntry> videoEntries = videoEntryService.searchVideoEntries(title);
        return ResponseEntity.ok(videoEntries);
    }
    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadVideo(
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("file") MultipartFile file) {
        
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }
            
            // Check file type
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("video/")) {
                return ResponseEntity.badRequest().body("File must be a video");
            }
            
            VideoEntry savedVideoEntry = videoEntryService.saveVideoEntry(title, description, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedVideoEntry);
            
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                               .body("Failed to upload video: " + e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateVideoEntry(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description) {
        
        try {
            VideoEntry updatedVideoEntry = videoEntryService.updateVideoEntry(id, title, description);
            return ResponseEntity.ok(updatedVideoEntry);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideoEntry(@PathVariable Long id) {
        try {
            videoEntryService.deleteVideoEntry(id);
            return ResponseEntity.noContent().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                               .body("Failed to delete video: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{id}/stream")
    public ResponseEntity<Resource> streamVideo(@PathVariable Long id) {
        try {
            Optional<VideoEntry> videoEntryOpt = videoEntryService.getVideoEntryById(id);
            if (videoEntryOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            VideoEntry videoEntry = videoEntryOpt.get();
            Path filePath = Paths.get(videoEntry.getFilePath());
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(videoEntry.getMimeType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + videoEntry.getFileName() + "\"")
                    .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}