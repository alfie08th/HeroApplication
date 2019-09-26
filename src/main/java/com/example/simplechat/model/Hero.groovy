package com.example.simplechat.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name="hero")
@JsonIgnoreProperties(ignoreUnknown = true)
class Hero {

    private static final  long  serialVersionUID = -3009157732242241606L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="name")
    private String name;
    @Column(name="power")
    private String power;
    @Column(name="weakness")
    private String weakness;
    @Column(name="info")
    private String info;

    Long getId() {
        return id
    }

    void setId(Long id) {
        this.id = id
    }

    String getName() {
        return name
    }

    void setName(String name) {
        this.name = name
    }

    String getPower() {
        return power
    }

    void setPower(String power) {
        this.power = power
    }

    String getWeakness() {
        return weakness
    }

    void setWeakness(String weakness) {
        this.weakness = weakness
    }

    String getInfo() {
        return info
    }

    void setInfo(String info) {
        this.info = info
    }

    boolean equals(o) {
        if (this.is(o)) return true
        if (!(o instanceof Hero)) return false

        Hero hero = (Hero) o

        if (id != hero.id) return false
        if (info != hero.info) return false
        if (name != hero.name) return false
        if (power != hero.power) return false
        if (weakness != hero.weakness) return false

        return true
    }

    int hashCode() {return Objects.hash(id, name, info, power, weakness);
    }
}
