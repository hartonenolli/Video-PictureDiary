package com.videodiary.repository;

import com.videodiary.entity.VideoEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VideoEntryRepository extends JpaRepository<VideoEntry, Long> {
    
    List<VideoEntry> findAllByOrderByCreatedAtDesc();
    
    List<VideoEntry> findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(String title);
    
    @Query("SELECT v FROM VideoEntry v WHERE v.createdAt BETWEEN :startDate AND :endDate ORDER BY v.createdAt DESC")
    List<VideoEntry> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
}