package backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import backend.model.Users;
import backend.repository.UsersRepository;

@Service
public class UsersService implements UserDetailsService 
{

	@Autowired
	private UsersRepository usersRepository;
	
	public List<Users> getAll(){
		return (List<Users>) usersRepository.findAll();
	}
	
	public Users getByEmail(String email){
		return usersRepository.findByEmail(email);
	}
	
	public void updateAccount(Users u){
		usersRepository.save(u);
	}
	
	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	Users user = usersRepository.findByEmail(username);
    	List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        UserDetails userDetails =
                org.springframework.security.core.userdetails.User.builder()
                        .username(user.getEmail())
                        .password(user.getPassword())
                        .authorities(authorities)
                        .build();
        System.out.println(username);
        return userDetails;
    }
}
