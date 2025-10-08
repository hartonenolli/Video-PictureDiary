class VideoDiaryApp {
    constructor() {
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.currentVideoBlob = null;
        this.stream = null;
        this.currentVideoId = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadVideoGallery();
    }
    
    initializeElements() {
        // Camera elements
        this.cameraPreview = document.getElementById('camera-preview');
        this.recordedPreview = document.getElementById('recorded-preview');
        this.startCameraBtn = document.getElementById('start-camera');
        this.startRecordingBtn = document.getElementById('start-recording');
        this.stopRecordingBtn = document.getElementById('stop-recording');
        this.saveVideoBtn = document.getElementById('save-video');
        this.discardVideoBtn = document.getElementById('discard-video');
        this.recordingStatus = document.getElementById('recording-status');
        
        // Form elements
        this.uploadSection = document.getElementById('upload-section');
        this.videoForm = document.getElementById('video-form');
        this.videoTitle = document.getElementById('video-title');
        this.videoDescription = document.getElementById('video-description');
        this.cancelUploadBtn = document.getElementById('cancel-upload');
        
        // Gallery elements
        this.videoGallery = document.getElementById('video-gallery');
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.refreshGalleryBtn = document.getElementById('refresh-gallery');
        this.loading = document.getElementById('loading');
        this.noVideos = document.getElementById('no-videos');
        
        // Modal elements
        this.modal = document.getElementById('video-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalVideo = document.getElementById('modal-video');
        this.modalDescription = document.getElementById('modal-description');
        this.modalDate = document.getElementById('modal-date');
        this.editVideoBtn = document.getElementById('edit-video');
        this.deleteVideoBtn = document.getElementById('delete-video');
        this.closeModal = document.querySelector('.close');
    }
    
    attachEventListeners() {
        // Camera controls
        this.startCameraBtn.addEventListener('click', () => this.startCamera());
        this.startRecordingBtn.addEventListener('click', () => this.startRecording());
        this.stopRecordingBtn.addEventListener('click', () => this.stopRecording());
        this.saveVideoBtn.addEventListener('click', () => this.showUploadForm());
        this.discardVideoBtn.addEventListener('click', () => this.discardVideo());
        
        // Form controls
        this.videoForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.cancelUploadBtn.addEventListener('click', () => this.hideUploadForm());
        
        // Gallery controls
        this.searchBtn.addEventListener('click', () => this.searchVideos());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchVideos();
        });
        this.refreshGalleryBtn.addEventListener('click', () => this.loadVideoGallery());
        
        // Modal controls
        this.closeModal.addEventListener('click', () => this.closeVideoModal());
        this.deleteVideoBtn.addEventListener('click', () => this.deleteVideo());
        this.editVideoBtn.addEventListener('click', () => this.editVideo());
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeVideoModal();
        });
        
        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeVideoModal();
            }
        });
    }
    
    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 1280, height: 720 }, 
                audio: true 
            });
            
            this.cameraPreview.srcObject = this.stream;
            this.startCameraBtn.disabled = true;
            this.startRecordingBtn.disabled = false;
            this.recordingStatus.textContent = 'Camera ready. Click "Start Recording" to begin.';
            
        } catch (error) {
            console.error('Error accessing camera:', error);
            this.recordingStatus.textContent = 'Error: Could not access camera. Please check permissions.';
            alert('Could not access camera. Please ensure you have granted camera permissions.');
        }
    }
    
    startRecording() {
        this.recordedChunks = [];
        
        const options = {
            mimeType: 'video/webm;codecs=vp9',
            videoBitsPerSecond: 2500000
        };
        
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options.mimeType = 'video/webm';
        }
        
        try {
            this.mediaRecorder = new MediaRecorder(this.stream, options);
            
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };
            
            this.mediaRecorder.onstop = () => {
                this.currentVideoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
                this.showRecordedVideo();
            };
            
            this.mediaRecorder.start();
            
            this.startRecordingBtn.disabled = true;
            this.stopRecordingBtn.disabled = false;
            this.recordingStatus.textContent = '🔴 Recording...';
            this.recordingStatus.classList.add('recording');
            
        } catch (error) {
            console.error('Error starting recording:', error);
            this.recordingStatus.textContent = 'Error: Could not start recording.';
        }
    }
    
    stopRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
        }
        
        this.startRecordingBtn.disabled = false;
        this.stopRecordingBtn.disabled = true;
        this.recordingStatus.textContent = 'Recording stopped. Review your video below.';
        this.recordingStatus.classList.remove('recording');
    }
    
    showRecordedVideo() {
        const videoURL = URL.createObjectURL(this.currentVideoBlob);
        this.recordedPreview.src = videoURL;
        this.recordedPreview.style.display = 'block';
        this.cameraPreview.style.display = 'none';
        
        this.saveVideoBtn.style.display = 'inline-block';
        this.discardVideoBtn.style.display = 'inline-block';
    }
    
    discardVideo() {
        this.currentVideoBlob = null;
        this.recordedPreview.style.display = 'none';
        this.cameraPreview.style.display = 'block';
        this.saveVideoBtn.style.display = 'none';
        this.discardVideoBtn.style.display = 'none';
        this.recordingStatus.textContent = 'Video discarded. Ready to record again.';
        
        // Clear the recorded video URL
        if (this.recordedPreview.src) {
            URL.revokeObjectURL(this.recordedPreview.src);
            this.recordedPreview.src = '';
        }
    }
    
    showUploadForm() {
        this.uploadSection.style.display = 'block';
        this.videoTitle.focus();
    }
    
    hideUploadForm() {
        this.uploadSection.style.display = 'none';
        this.videoTitle.value = '';
        this.videoDescription.value = '';
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        if (!this.currentVideoBlob) {
            alert('No video to upload. Please record a video first.');
            return;
        }
        
        const title = this.videoTitle.value.trim();
        if (!title) {
            alert('Please enter a title for your video.');
            return;
        }
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', this.videoDescription.value.trim());
        formData.append('file', this.currentVideoBlob, 'recorded-video.webm');
        
        try {
            this.recordingStatus.textContent = 'Uploading video...';
            
            const response = await fetch('/api/videos', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                const result = await response.json();
                this.recordingStatus.textContent = 'Video uploaded successfully!';
                this.hideUploadForm();
                this.discardVideo();
                this.loadVideoGallery();
                alert('Video uploaded successfully!');
            } else {
                const error = await response.text();
                throw new Error(error);
            }
            
        } catch (error) {
            console.error('Upload error:', error);
            this.recordingStatus.textContent = 'Error uploading video.';
            alert('Error uploading video: ' + error.message);
        }
    }
    
    async loadVideoGallery() {
        this.loading.style.display = 'block';
        this.noVideos.style.display = 'none';
        this.videoGallery.innerHTML = '';
        
        try {
            const response = await fetch('/api/videos');
            const videos = await response.json();
            
            this.loading.style.display = 'none';
            
            if (videos.length === 0) {
                this.noVideos.style.display = 'block';
            } else {
                this.renderVideoGallery(videos);
            }
            
        } catch (error) {
            console.error('Error loading videos:', error);
            this.loading.style.display = 'none';
            this.videoGallery.innerHTML = '<p class="error">Error loading videos. Please try again.</p>';
        }
    }
    
    renderVideoGallery(videos) {
        this.videoGallery.innerHTML = '';
        
        videos.forEach(video => {
            const videoCard = this.createVideoCard(video);
            this.videoGallery.appendChild(videoCard);
        });
    }
    
    createVideoCard(video) {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.addEventListener('click', () => this.openVideoModal(video));
        
        const formattedDate = new Date(video.createdAt).toLocaleDateString();
        const formattedSize = this.formatFileSize(video.fileSize);
        
        card.innerHTML = `
            <video class="video-thumbnail" preload="metadata">
                <source src="/api/videos/${video.id}/stream" type="${video.mimeType}">
            </video>
            <div class="video-info">
                <div class="video-title">${this.escapeHtml(video.title)}</div>
                <div class="video-description">${this.escapeHtml(video.description || 'No description')}</div>
                <div class="video-meta">
                    <span>${formattedDate}</span>
                    <span>${formattedSize}</span>
                </div>
            </div>
        `;
        
        return card;
    }
    
    openVideoModal(video) {
        this.currentVideoId = video.id;
        this.modalTitle.textContent = video.title;
        this.modalDescription.textContent = video.description || 'No description';
        this.modalDate.textContent = new Date(video.createdAt).toLocaleString();
        this.modalVideo.src = `/api/videos/${video.id}/stream`;
        this.modal.style.display = 'block';
    }
    
    closeVideoModal() {
        this.modal.style.display = 'none';
        this.modalVideo.pause();
        this.modalVideo.src = '';
        this.currentVideoId = null;
    }
    
    async searchVideos() {
        const searchTerm = this.searchInput.value.trim();
        
        if (!searchTerm) {
            this.loadVideoGallery();
            return;
        }
        
        this.loading.style.display = 'block';
        this.noVideos.style.display = 'none';
        this.videoGallery.innerHTML = '';
        
        try {
            const response = await fetch(`/api/videos/search?title=${encodeURIComponent(searchTerm)}`);
            const videos = await response.json();
            
            this.loading.style.display = 'none';
            
            if (videos.length === 0) {
                this.videoGallery.innerHTML = '<p class="no-content">No videos found matching your search.</p>';
            } else {
                this.renderVideoGallery(videos);
            }
            
        } catch (error) {
            console.error('Search error:', error);
            this.loading.style.display = 'none';
            this.videoGallery.innerHTML = '<p class="error">Error searching videos. Please try again.</p>';
        }
    }
    
    async deleteVideo() {
        if (!this.currentVideoId) return;
        
        if (!confirm('Are you sure you want to delete this video? This action cannot be undone.')) {
            return;
        }
        
        try {
            const response = await fetch(`/api/videos/${this.currentVideoId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                this.closeVideoModal();
                this.loadVideoGallery();
                alert('Video deleted successfully!');
            } else {
                throw new Error('Failed to delete video');
            }
            
        } catch (error) {
            console.error('Delete error:', error);
            alert('Error deleting video: ' + error.message);
        }
    }
    
    editVideo() {
        const newTitle = prompt('Enter new title:', this.modalTitle.textContent);
        if (newTitle === null) return;
        
        const newDescription = prompt('Enter new description:', this.modalDescription.textContent);
        if (newDescription === null) return;
        
        this.updateVideo(newTitle, newDescription);
    }
    
    async updateVideo(title, description) {
        if (!this.currentVideoId) return;
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        
        try {
            const response = await fetch(`/api/videos/${this.currentVideoId}`, {
                method: 'PUT',
                body: formData
            });
            
            if (response.ok) {
                const updatedVideo = await response.json();
                this.modalTitle.textContent = updatedVideo.title;
                this.modalDescription.textContent = updatedVideo.description || 'No description';
                this.loadVideoGallery();
                alert('Video updated successfully!');
            } else {
                throw new Error('Failed to update video');
            }
            
        } catch (error) {
            console.error('Update error:', error);
            alert('Error updating video: ' + error.message);
        }
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoDiaryApp();
});