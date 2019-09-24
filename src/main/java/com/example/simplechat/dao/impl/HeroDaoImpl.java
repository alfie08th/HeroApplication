package com.example.simplechat.dao.impl;

import com.example.simplechat.dao.HeroDao;
import com.example.simplechat.model.Hero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.util.*;

public class HeroDaoImpl extends JdbcDaoSupport implements HeroDao {

    @Autowired
    DataSource dataSource;

    @PostConstruct
    private void initialize(){
        setDataSource(dataSource);
    }

    @Override
    public List<Hero> getAllHeroes() {
        String  sql = "SELECT * FROM hero";
        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(sql);

        List<Hero> result = new ArrayList<>();
        for(Map<String, Object> row : rows){
            Hero hero = new Hero();
            hero.setId((Long)row.get("id"));
            hero.setName((String)row.get("name"));
            hero.setPower((String)row.get("power"));
            hero.setWeakness((String)row.get("weakness"));
            hero.setInfo((String)row.get("info"));
        }
        return result;
    }
}
