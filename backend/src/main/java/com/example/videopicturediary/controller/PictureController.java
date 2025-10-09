package com.example.videopicturediary.controller;
import com.example.videopicturediary.model.Picture;
import com.example.videopicturediary.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PictureController {

    @Autowired
    private PictureService pictureService;

    @Autowired
    public PictureController(PictureService pictureService) {
        this.pictureService = pictureService;
    }

    @GetMapping("/pictures")
    public List<Picture> getAllPictures() {
        return pictureService.getAllPictures();
    }

    @PostMapping("/pictures")
    public Picture addPicture(@RequestBody Picture picture) {
        // Placeholder implementation
        return pictureService.addPicture(picture);
    }

}
