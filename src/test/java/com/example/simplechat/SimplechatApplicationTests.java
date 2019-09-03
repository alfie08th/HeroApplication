package com.example.simplechat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SimplechatApplicationTests {


	List<String> tempHero = new ArrayList();

//	@Test
	public void contextLoads() throws Exception {
//		String url = "https://serpapi.com/playground?engine=google&q=jessica+bangkok+xxx&google_domain=google.com&ijn=0&tbm=isch";

//		String url = "https://www.google.com/search?q=" + "jessica+bangkok" + "&client=safari&rls=en&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjRtprqrKnkAhWmd98KHXaCBRUQ_AUIEigC";
		String result = "";
		String url = "http://www.pornpics.com/?q=jessica+bangkok";

		HttpURLConnection c;
		try {
			URL u = new URL(url);
			c = (HttpURLConnection) u.openConnection();
			c.setRequestMethod("GET");
			c.setRequestProperty("Content-length", "0");
			c.connect();
			int status = c.getResponseCode();

			switch (status) {
				case 200:
				case 201:
					BufferedReader br = new BufferedReader(new InputStreamReader(c.getInputStream()));
					StringBuilder sb = new StringBuilder();
					String line;
					while ((line = br.readLine()) != null) {
						sb.append(line + "\n");
					}
					br.close();
					result = sb.toString();
				default:
					System.out.println("status: " + status);
			}
		}catch (Exception e){
			throw new Exception(e);
		}
		System.out.println("result: " + result);
	}

	@Test
	public void showResult() throws Exception{
		String path = "src/main/resources/assets/cred.txt";
		try (PrintStream out = new PrintStream(new FileOutputStream(path))) {
			out.print("username");
			out.print("\n");
			out.print("password");
			out.flush();
		}catch (Exception e){
			throw new Exception("error: " + e);
		}

		try{
			List<String> mal = Files.readAllLines(Paths.get(path));
			System.out.println("mal: " + mal);
		}catch (Exception e) {
			throw new Exception("error: " + e);
		}
	}

	public List<String> getHttpResponse(){
		StringBuffer response = new StringBuffer();
		List<String> bask = new ArrayList<>();
		try {
			String url = "http://localhost:8080/cred-sent";
			URL obj = new URL(url);
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();
			int responseCode = con.getResponseCode();
			System.out.println("\nSending 'GET' request to URL : " + url);
			System.out.println("Response Code : " + responseCode);
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

		result = result.replace("\"", "");
		result = result.replace("[", "");
		result = result.replace("]", "");

		int comma = result.indexOf(",");
		int lastChar = result.length()-1;

		bask.add(result.substring(0,comma));
		bask.add(result.substring(comma+1, lastChar));

		return bask;
	}

	@Test
	public void donothing() throws Exception{
		int num = Integer.parseInt("3");
		int num2 = 0;
		try {
			num2 = Integer.parseInt("fasd");
		}catch (Exception e){
			throw new Exception("error", e);
		}

		System.out.println(num + " : " + num2);
		num2 = Integer.parseInt("fasdfad");

		System.out.println(num + " : " + num2);
	}

}
