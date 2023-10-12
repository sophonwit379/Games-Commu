package backend.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import backend.model.Images;
import backend.service.ImagesService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ImagesController {

	@Value("${upload.dir}")
	private String uploadDir;

	@Autowired
	private ImagesService imagesService;

	@GetMapping("/images")
	public List<Images> getAll() {
		return (List<Images>) imagesService.getAll();
	}

	@SuppressWarnings("rawtypes")
	@GetMapping("/images/count")
	public ResponseEntity countImages(@RequestParam(required = false, name = "gid") Integer gid,
			@RequestParam(required = false, name = "pid") Integer pid,
			@RequestParam(required = false, name = "cid") Integer cid) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		if (gid != null && pid == null && cid == null) {
			return ResponseEntity.ok(imagesService.countByGID(gid));
		} else if (gid == null && pid != null && cid == null) {
			return ResponseEntity.ok(imagesService.countByPID(pid));
		} else if (gid == null && pid == null && cid != null) {
			return ResponseEntity.ok(imagesService.countByCID(cid));
		} else if (gid == null && pid == null && cid == null) {
			return ResponseEntity.ok(imagesService.countByEmail(currentUserEmail));
		} else {
			return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("ID types must not exceed 1 type");
		}
	}

	@SuppressWarnings("rawtypes")
	@GetMapping("/images/call")
	public ResponseEntity getImages(@RequestParam(required = false, name = "gid") Integer gid,
			@RequestParam(required = false, name = "pid") Integer pid,
			@RequestParam(required = false, name = "cid") Integer cid, @RequestParam("page") int page) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		List<Images> imagesList;
		int maxPage;
		if (gid != null && pid == null && cid == null) {
			imagesList = imagesService.getByGID(gid);
			maxPage = imagesService.countByGID(gid);
		} else if (gid == null && pid != null && cid == null) {
			imagesList = imagesService.getByPID(pid);
			maxPage = imagesService.countByPID(pid);
		} else if (gid == null && pid == null && cid != null) {
			imagesList = imagesService.getByCID(cid);
			maxPage = imagesService.countByCID(cid);
		} else if (gid == null && pid == null && cid == null) {
			imagesList = imagesService.getByEmail(currentUserEmail);
			maxPage = imagesService.countByEmail(currentUserEmail);
		} else {
			return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("ID types must not exceed 1 type");
		}
		byte[] imageBytes;
		if (maxPage > page) {
			try {
				imageBytes = Files.readAllBytes(Paths.get(uploadDir, imagesList.get(page).getPath()));
			} catch (IOException e) {
				// Handle exceptions appropriately
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.IMAGE_JPEG);
			return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
		} else
			return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Number of pages exceeded");
	}

	@PostMapping("/images/upload")
	public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
			@RequestParam(required = false, name = "gid") Integer gid,
			@RequestParam(required = false, name = "pid") Integer pid,
			@RequestParam(required = false, name = "cid") Integer cid) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserEmail = authentication.getName();
		try {
			// Validate the file's content type
			String contentType = file.getContentType();
			if (contentType != null && (contentType.equals("image/jpg") || contentType.equals("image/png"))) {
				// Generate a new unique file name (you can use your own naming convention)
				String originalFileName = file.getOriginalFilename();
				String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
				String newFileName = UUID.randomUUID().toString() + fileExtension;

				// Construct the file path where the uploaded file should be saved
				String filePath = Paths.get(uploadDir, newFileName).toString();

				// Process the uploaded file and save it to the specified path
				Files.write(Paths.get(filePath), file.getBytes());

				if (gid != null && pid == null && cid == null) {
					imagesService.createImageForGame(gid, newFileName);
				} else if (gid == null && pid != null && cid == null) {
					imagesService.createImageForPost(pid, newFileName);
				} else if (gid == null && pid == null && cid != null) {
					imagesService.createImageForComment(cid, newFileName);
				} else if (gid == null && pid == null && cid == null) {
					imagesService.createImageForUser(currentUserEmail, newFileName);
				} else {
					return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("ID types must not exceed 1 type");
				}

				// Return a success message
				return ResponseEntity.ok("File uploaded successfully with the new name: " + newFileName);
			} else {
				// Invalid file type
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file type");
			}
		} catch (IOException e) {
			// Handle file upload errors
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
		}
	}
}
