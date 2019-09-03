package com.example.simplechat.services;

import com.example.simplechat.model.Hero;
import com.example.simplechat.repositories.HeroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HeroService {

    @Autowired
    HeroRepository heroRepository;

    Hero create(Hero hero){
        return null;
    }

    Hero replace(Hero hero, long id){
        return null;
    }

    Hero update(Hero hero, long id){
        return null;
    }

    Hero delete(Hero hero, long id){
        return null;
    }
}
