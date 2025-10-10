package com.example.videopicturediary.controller;
import com.example.videopicturediary.model.Picture;
import com.example.videopicturediary.repository.PictureRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/pictures")
public class PictureController {

    @Autowired
    private PictureRepository pictureRepository;

    private final String uploadDir = "uploads/";

    @PostMapping
    public ResponseEntity<Picture> uploadPicture(
            @RequestParam("title") String title,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "url", required = false) String url
    ) throws IOException {
        String storedUrl;

        if (file != null && !file.isEmpty()) {
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            Path filePath = Paths.get(uploadDir, file.getOriginalFilename());
            Files.write(filePath, file.getBytes());

            storedUrl = filePath.toString();
        } else {
            storedUrl = url != null ? url : "";
        }

        Picture picture = new Picture(title, storedUrl);
        Picture saved = pictureRepository.save(picture);

        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<?> getAllPictures() {
        return ResponseEntity.ok(pictureRepository.findAll());
    }
}