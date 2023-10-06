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
@CrossOrigin(origins = "http://localhost:5173")
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
        try {
        	Users existingUser = usersService.getByEmail(loginReq.getUsername());
        	if (existingUser != null && 
        			existingUser.getPassword().equals(loginReq.getPassword())) {
        		Authentication authentication =
                        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getUsername(), loginReq.getPassword()));
        		String email = authentication.getName();
        		Users user = usersService.getByEmail(email);
                String token = jwtUtil.createToken(user);
                usersService.nowLogin(email);
                return ResponseEntity.ok(token);
        	}
        	else {
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