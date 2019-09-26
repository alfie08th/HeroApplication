package com.example.simplechat.services.impl;

import com.example.simplechat.dao.HeroDao;
import com.example.simplechat.model.Hero;
import com.example.simplechat.services.HeroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HeroServiceImpl implements HeroService {

    @Autowired
//    HeroDao heroDao;

    @Override
    public List<Hero> getAllHeroes() {
        return null;
    }
}
