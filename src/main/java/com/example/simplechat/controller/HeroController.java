package com.example.simplechat.controller;

import com.example.simplechat.model.Hero;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.Base64;

@CrossOrigin(origins = "https://localhost:4200")
@RestController
public class HeroController {

    private List<Hero> heroes = new ArrayList<>();
    List<String> tempCred = new ArrayList();
    String dataFromAng = "";

    private String path = "src/main/resources/assets/cred.txt";
    int count = 0;


    @PostMapping("add-hero")
    public Hero createHero(@RequestBody Hero heroes) {
        this.heroes.add(heroes);
        return heroes;
    }


    @GetMapping(value = "/hero")
    private List<Hero> showHero(){
        return this.heroes;
    }

    private static List<Hero> createList(String name, String power, String weakness, String info) {
        List<Hero> tempHero = new ArrayList<>();
        Hero hero = new Hero();
        hero.setId(1L);
        hero.setInfo(name);
        hero.setName(power);
        hero.setPower(weakness);
        hero.setWeakness(info);
        tempHero.add(hero);
        return tempHero;
    }

    @PutMapping("hero/pass-cred")
    public List<String> updateCred(@RequestBody List<String> post) {
        tempCred = post;
        return tempCred;
    }

    @GetMapping("hero/cred")
    public List<String> getTempCred() throws Exception {
        List<String> localCred = tempCred;
        List<String> prevCred;
        String username = localCred.get(0);
        String password = localCred.get(1);

        if(count<1){
            addDecryptedToCredList(username, password);
        }

        try{
            prevCred = Files.readAllLines(Paths.get(path));

            if(!prevCred.get(0).equals(username)){
                addDecryptedToCredList(username, password);
            }
        }catch (Exception e) {throw new Exception("error: " + e);}

        count++;
        return localCred;
    }

    private void addDecryptedToCredList(String username, String password) throws Exception{
        String decoded_username = new String(Base64.getDecoder().decode(username));
        String decoded_password = new String(Base64.getDecoder().decode(password));
        tempCred.set(0, decoded_username);
        tempCred.set(1, decoded_password);
        storeCredentials(decoded_username, decoded_password);
    }

    private void storeCredentials(String username, String password) throws Exception{
        try (PrintStream out = new PrintStream(new FileOutputStream(path))) {
            out.print(username);
            out.print("\n");
            out.print(password);
        }catch (Exception e){
            throw new Exception("error: " + e);
        }
    }

    @PostMapping("send-to-java")
    public void catchCred(@RequestBody String post) {
        dataFromAng = post;
    }

    @GetMapping("data-sent-to-java")
    public String dataFromAng(){
        return dataFromAng;
    }

    private String getHttpResponse(){
        StringBuffer response = new StringBuffer();
        try {
			String url = "http://localhost:8080/data-sent-to-java";
			URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            if(responseCode==200){
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
            }
            in.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        String result = response.toString();
        System.out.println("result: " + result);
        return result;
    }

    @GetMapping("send-to-ang")
    public String sentValue() {
        String result = "";
        String response = getHttpResponse();
        boolean receivedOrNot = true;
        while (receivedOrNot) {
            if (response == null) {
                result = response;
            }else{
                result = response;
                break;
            }
        }
        result = "" + (Integer.parseInt(result)/2);
        return result;
    }
}
