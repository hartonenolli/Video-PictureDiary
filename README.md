# Video Picture Diary

A modern web application for creating and managing personal video diaries. Record videos directly in your browser using your camera, organize them with titles and descriptions, and browse your video collection.

## Features

- 📹 **Camera Recording**: Record videos directly in your browser using your device's camera
- 🎬 **Video Management**: Upload, view, edit, and delete video entries
- 📝 **Rich Metadata**: Add titles and descriptions to organize your videos
- 🔍 **Search**: Find videos by title with real-time search
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🗄️ **PostgreSQL Database**: Robust data storage with proper relationships
- 🌐 **RESTful API**: Clean API design for potential mobile app integration

## Technology Stack

### Backend
- **Java 17** with **Spring Boot 3.2.0**
- **Spring Data JPA** for database operations
- **PostgreSQL** for production database
- **H2** for testing
- **Maven** for dependency management

### Frontend
- **HTML5** with **MediaRecorder API** for video recording
- **Vanilla JavaScript** (ES6+) for dynamic functionality
- **CSS3** with modern responsive design
- **Web APIs**: Camera access, File handling

## Prerequisites

- Java 17 or later
- Docker and Docker Compose (for PostgreSQL)
- Modern web browser with camera support
- Maven 3.6+ (optional, can use the wrapper)

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/hartonenolli/Video-PictureDiary.git
cd Video-PictureDiary
```

### 2. Start PostgreSQL Database
```bash
docker-compose up -d
```

This will start PostgreSQL on port 5432 with the following credentials:
- Database: `videodiary`
- Username: `videodiary_user`
- Password: `videodiary_password`

### 3. Run the Application
```bash
# Using Maven wrapper (recommended)
./mvnw spring-boot:run

# Or if you have Maven installed
mvn spring-boot:run
```

### 4. Open Your Browser
Navigate to `http://localhost:8080` to start using the application.

## Project Structure

```
src/
├── main/
│   ├── java/com/videodiary/
│   │   ├── VideoPictureDiaryApplication.java  # Main application class
│   │   ├── controller/
│   │   │   └── VideoEntryController.java      # REST API endpoints
│   │   ├── entity/
│   │   │   └── VideoEntry.java                # JPA entity
│   │   ├── repository/
│   │   │   └── VideoEntryRepository.java      # Data repository
│   │   └── service/
│   │       └── VideoEntryService.java         # Business logic
│   └── resources/
│       ├── static/                            # Frontend files
│       │   ├── index.html                     # Main UI
│       │   ├── css/style.css                  # Styling
│       │   └── js/app.js                      # JavaScript logic
│       └── application.properties             # Configuration
└── test/                                      # Unit tests
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/videos` | Get all video entries |
| GET | `/api/videos/{id}` | Get specific video entry |
| GET | `/api/videos/search?title={query}` | Search videos by title |
| GET | `/api/videos/{id}/stream` | Stream video file |
| POST | `/api/videos` | Upload new video |
| PUT | `/api/videos/{id}` | Update video metadata |
| DELETE | `/api/videos/{id}` | Delete video entry |

## Configuration

### Database Configuration
Edit `src/main/resources/application.properties` to modify database settings:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/videodiary
spring.datasource.username=videodiary_user
spring.datasource.password=videodiary_password
```

### File Upload Settings
```properties
spring.servlet.multipart.max-file-size=50MB
spring.servlet.multipart.max-request-size=50MB
app.upload.dir=uploads/videos
```

## Development

### Running Tests
```bash
./mvnw test
```

### Building for Production
```bash
./mvnw clean package
java -jar target/video-picture-diary-1.0.0.jar
```

### Development with Auto-reload
```bash
./mvnw spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.profiles.active=dev"
```

## Browser Support

This application requires a modern browser with support for:
- MediaRecorder API (for video recording)
- getUserMedia API (for camera access)
- ES6+ JavaScript features

**Supported browsers:**
- Chrome 60+
- Firefox 70+
- Safari 14+
- Edge 80+

## Security Considerations

- Files are uploaded to a configurable directory outside the web root
- Input validation on all forms
- CORS configuration for cross-origin requests
- File type validation for uploads

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Troubleshooting

### Camera not working
- Ensure you've granted camera permissions to your browser
- Check that your camera is not being used by another application
- Try refreshing the page and granting permissions again

### Database connection issues
- Verify PostgreSQL is running: `docker-compose ps`
- Check database credentials in `application.properties`
- Ensure port 5432 is not blocked by firewall

### Upload failures
- Check file size limits in configuration
- Verify the upload directory exists and is writable
- Ensure sufficient disk space

### Build issues
- Verify Java 17+ is installed: `java -version`
- Clear Maven cache: `./mvnw clean`
- Check for port conflicts (default: 8080)
