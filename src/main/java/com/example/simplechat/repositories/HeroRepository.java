package com.example.simplechat.repositories;

import com.example.simplechat.model.Hero;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface HeroRepository extends CrudRepository<Hero, Long> {
    List<Hero> findHeroById(Long id);
}
