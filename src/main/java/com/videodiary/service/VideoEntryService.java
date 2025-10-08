package com.videodiary.service;

import com.videodiary.entity.VideoEntry;
import com.videodiary.repository.VideoEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class VideoEntryService {
    
    @Autowired
    private VideoEntryRepository videoEntryRepository;
    
    @Value("${app.upload.dir}")
    private String uploadDir;
    
    public List<VideoEntry> getAllVideoEntries() {
        return videoEntryRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public Optional<VideoEntry> getVideoEntryById(Long id) {
        return videoEntryRepository.findById(id);
    }
    
    public List<VideoEntry> searchVideoEntries(String title) {
        return videoEntryRepository.findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(title);
    }
    
    public List<VideoEntry> getVideoEntriesBetweenDates(LocalDateTime startDate, LocalDateTime endDate) {
        return videoEntryRepository.findByCreatedAtBetween(startDate, endDate);
    }
    
    public VideoEntry saveVideoEntry(String title, String description, MultipartFile file) throws IOException {
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename != null && originalFilename.contains(".") 
            ? originalFilename.substring(originalFilename.lastIndexOf("."))
            : "";
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
        
        // Save file
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        // Create and save video entry
        VideoEntry videoEntry = new VideoEntry(
            title,
            description,
            filePath.toString(),
            originalFilename,
            file.getSize(),
            file.getContentType()
        );
        
        return videoEntryRepository.save(videoEntry);
    }
    
    public VideoEntry updateVideoEntry(Long id, String title, String description) {
        Optional<VideoEntry> optionalVideoEntry = videoEntryRepository.findById(id);
        if (optionalVideoEntry.isPresent()) {
            VideoEntry videoEntry = optionalVideoEntry.get();
            videoEntry.setTitle(title);
            videoEntry.setDescription(description);
            return videoEntryRepository.save(videoEntry);
        }
        throw new RuntimeException("Video entry not found with id: " + id);
    }
    
    public void deleteVideoEntry(Long id) throws IOException {
        Optional<VideoEntry> optionalVideoEntry = videoEntryRepository.findById(id);
        if (optionalVideoEntry.isPresent()) {
            VideoEntry videoEntry = optionalVideoEntry.get();
            
            // Delete file from filesystem
            Path filePath = Paths.get(videoEntry.getFilePath());
            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }
            
            // Delete from database
            videoEntryRepository.delete(videoEntry);
        } else {
            throw new RuntimeException("Video entry not found with id: " + id);
        }
    }
}