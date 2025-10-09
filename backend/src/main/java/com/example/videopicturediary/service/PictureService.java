package com.example.videopicturediary.service;
import com.example.videopicturediary.model.Picture;
import java.util.List;

import org.springframework.stereotype.Service;
import com.example.videopicturediary.repository.PictureRepository;

import java.util.ArrayList;

@Service
public class PictureService {
    private final PictureRepository pictureRepository;

    public PictureService(PictureRepository pictureRepository) {
        this.pictureRepository = pictureRepository;
    }
    public List<Picture> getAllPictures() {
        return pictureRepository.findAll();
    }

    public Picture addPicture(Picture picture) {
        return pictureRepository.save(picture);
    }
    // Mock implementations for demonstration purposes
    public List<Picture> getAllPictures_Mock() {
        List<Picture> pictures = new ArrayList<>();
        Picture picture1 = new Picture();
        picture1.setId(1L);
        picture1.setTitle("Sample Picture 1");
        picture1.setUrl("http://example.com/picture1.jpg");
        Picture picture2 = new Picture();
        picture2.setId(2L);
        picture2.setTitle("Sample Picture 2");
        picture2.setUrl("http://example.com/picture2.jpg");
        pictures.add(picture1);
        pictures.add(picture2);
        return pictures;
    }
}
