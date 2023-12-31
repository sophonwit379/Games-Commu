package backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;

import backend.service.UsersService;

@SuppressWarnings("deprecation")
@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final UsersService usersService;
	private final JwtAuthorizationFilter jwtAuthorizationFilter;

	public SecurityConfig(UsersService usersService, JwtAuthorizationFilter jwtAuthorizationFilter) {
		this.usersService = usersService;
		this.jwtAuthorizationFilter = jwtAuthorizationFilter;

	}

	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http, NoOpPasswordEncoder noOpPasswordEncoder)
			throws Exception {
		AuthenticationManagerBuilder authenticationManagerBuilder = http
				.getSharedObject(AuthenticationManagerBuilder.class);
		authenticationManagerBuilder.userDetailsService(usersService).passwordEncoder(noOpPasswordEncoder);
		return authenticationManagerBuilder.build();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors().configurationSource(request -> {
			CorsConfiguration corsConfig = new CorsConfiguration();
			corsConfig.addAllowedOrigin("http://localhost:5173");
			corsConfig.addAllowedMethod("*");
			corsConfig.addAllowedHeader("*");
			return corsConfig;
		}).and().csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests((requests) -> requests
				.requestMatchers(new AntPathRequestMatcher("/api/authtoken/**")).permitAll()
				.requestMatchers(new AntPathRequestMatcher("/api-docs/**"), new AntPathRequestMatcher("/swagger-ui/**"))
				.permitAll().requestMatchers(new AntPathRequestMatcher("/api/users/create/**")).permitAll()
				.requestMatchers(new AntPathRequestMatcher("/api/posts/notlogin/**")).permitAll()
				.requestMatchers(new AntPathRequestMatcher("/api/games/all/**")).permitAll()
				.requestMatchers(new AntPathRequestMatcher("/api/games/game/**")).permitAll()
				.requestMatchers(new AntPathRequestMatcher("/api/images/count/**")).permitAll()
				.requestMatchers(new AntPathRequestMatcher("/api/likes/count/**")).permitAll()
				.requestMatchers(new AntPathRequestMatcher("/api/images/call/**")).permitAll().anyRequest()
				.authenticated()).formLogin().disable() // Disable form-based login
				.httpBasic().disable() // Disable HTTP Basic authentication
				.addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
				.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}

	@Bean
	public NoOpPasswordEncoder passwordEncoder() {
		return (NoOpPasswordEncoder) NoOpPasswordEncoder.getInstance();
	}

}
