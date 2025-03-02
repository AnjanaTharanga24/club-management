package com.uokclubmanagement.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.uokclubmanagement.entity.Award;
import com.uokclubmanagement.entity.Club;
import com.uokclubmanagement.service.AwardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/award")
public class AwardController {

    @Autowired
    private AwardService awardService;

//    @PostMapping("/{clubId}/save/{clubAdminId}")
//    public Award saveAward(@PathVariable String clubId, @PathVariable String clubAdminId, @RequestBody Award award, @RequestParam("image") MultipartFile image) throws IOException {
//        return awardService.createAward(clubAdminId, clubId, award, image);
//    }

    @PostMapping("/{clubId}/save/{clubAdminId}")
    public Award saveAward(
            @PathVariable String clubId,
            @PathVariable String clubAdminId,
            @RequestPart("award") String awardJson,
            @RequestPart("file") MultipartFile file) throws IOException {

        // Register the JavaTimeModule
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        // Deserialize the JSON string to an Award object
        Award award = objectMapper.readValue(awardJson, Award.class);

        // Call the service method
        return awardService.createAward(clubAdminId, clubId, award, file);
    }

    @GetMapping("/all")
    public List<Award> getAllAwards() {
        return awardService.getAllAwards();
    }

    @GetMapping("/{clubId}/getAllAwardsByClubId")
    public List<Award> getAllAwardsByClubId(@PathVariable String clubId) {
        return awardService.getAllAwardsByClubId(clubId);
    }

    @DeleteMapping("/{awardId}/deleteAward")
    public void deleteAward(@PathVariable String awardId) {
        awardService.deleteAward(awardId);
    }

    @PutMapping("/{clubAdminId}/update/{awardId}")
    public Award updateAward(@PathVariable String clubAdminId, @PathVariable String awardId, @RequestBody Award award, @RequestParam("image") MultipartFile image) throws IOException {
        return awardService.updateAward(clubAdminId, awardId, award, image);
    }

    @GetMapping("/findAwardById/{awardId}")
    public Award findAwardById(@PathVariable("awardId") String awardId) {
        return awardService.getAwardById(awardId);
    }
}
