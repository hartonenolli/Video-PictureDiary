# Here is the status of the project at this stage 17.10.2025.

## Functionalities implemented

- The basic structure of the app
- Methods implemented
    - Capture directly from device camera.
    - Upload from files.
- Frontend / UX
    - Built with MUI components; consistent, responsive and accessible UI.
    - Visual feedback for uploads.

## Goals for the next update

- Making a video from added pictures
    - Goal: let users combine selected/added pictures into a single downloadable video (MP4).
    - Tasks:
        - UI: allow ordering, set frame rate, duration per image, optional transitions and background audio.
        - Backend/processing: implement video generation (ffmpeg on server or ffmpeg.wasm client-side) and expose an endpoint or client export.
        - UX: show progress, allow preview, handle large files and errors.
    - Acceptance criteria:
        - Produce a playable MP4 from selected images.
        - Download link or automatic save is available after processing.
        - Progress indicator and basic error handling present.
    - Notes: prefer server-side ffmpeg for large exports; consider ffmpeg.wasm for offline/client-side previews.

## Pictures

### Front page

![Front page]()

### Taking a picture

![Take a picture]()

### Picture taken

![Picture taken]()

### Picture added

![Picture added]()

### Uploading a picture

![Upload a picture]()

### Choose a file

![Choosing a file]()

## Thoughts and what I learned

Bootstrap was completely new to me; it was challenging at first, but I learned a lot and it proved useful for speeding up development.
