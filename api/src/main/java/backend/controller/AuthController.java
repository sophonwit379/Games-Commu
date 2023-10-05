package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import backend.model.ErrorRes;
import backend.model.LoginReq;
import backend.model.Users;
import backend.security.JwtUtil;
import backend.service.UsersService;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    
    @Autowired
    private UsersService usersService;

    private JwtUtil jwtUtil;
    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;

    }

    @SuppressWarnings("rawtypes")
    @ResponseBody
    @PostMapping("/authtoken")
    public ResponseEntity login(@RequestBody LoginReq loginReq)  {
    	System.out.println("Do");
        try {
        	Users existingUser = usersService.getByEmail(loginReq.getUsername());
        	if (existingUser != null && 
        			//new BCryptPasswordEncoder().matches(loginReq.getPassword(), existingUser.getPassword())) {
        			existingUser.getPassword().equals(loginReq.getPassword())) {
        		System.out.println("Do2");
        		
        		Authentication authentication =
                        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getUsername(), loginReq.getPassword()));
        		System.out.println("Do3");
        		String email = authentication.getName();
        		Users user = usersService.getByEmail(email);
                String token = jwtUtil.createToken(user);
                System.out.println(token);
                return ResponseEntity.ok(token);
        	}
        	else {
        		System.out.println("login "+loginReq.getPassword());
        		System.out.println("chk   "+existingUser.getPassword());
    			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password or username incorrect.");
    		}    

        }
        catch (BadCredentialsException e){
            ErrorRes errorResponse = new ErrorRes(HttpStatus.BAD_REQUEST,"Invalid username or password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
        catch (Exception e){
            ErrorRes errorResponse = new ErrorRes(HttpStatus.BAD_REQUEST, e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}