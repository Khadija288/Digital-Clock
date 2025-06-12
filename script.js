  // Generate floating background elements
        function createFloatingElements() {
            const numElements = 15;
            const body = document.body;
            
            for (let i = 0; i < numElements; i++) {
                const element = document.createElement('div');
                element.classList.add('floating-element');
                
                // Random size
                const size = Math.random() * 120 + 40;
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                
                // Random position
                element.style.left = `${Math.random() * 100}%`;
                element.style.top = `${Math.random() * 100}%`;
                
                // Random animation delay
                element.style.animationDelay = `${Math.random() * 15}s`;
                
                // Random shape (some will be circles, some will be squares)
                if (Math.random() > 0.7) {
                    element.style.borderRadius = '10px';
                }
                
                body.appendChild(element);
            }
        }
        
        // Update clock function
        function updateClock() {
            const now = new Date();
            
            // Format time
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            
            // Format date
            const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
            const day = days[now.getDay()];
            
            const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            const date = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
            
            // Update DOM
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
            document.getElementById('day').textContent = day;
            document.getElementById('date').textContent = date;
            
            // Add animation to seconds
            if(seconds === '00') {
                document.getElementById('seconds').style.opacity = '0.3';
                setTimeout(() => {
                    document.getElementById('seconds').style.opacity = '1';
                }, 100);
            }
        }
        
        // Theme switching functionality
        function setTheme(theme) {
            document.body.className = theme + '-theme';
            localStorage.setItem('theme', theme);
        }
        
        // Load saved theme or set default
        function loadTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            setTheme(savedTheme);
        }
        
        // Initial setup
        document.addEventListener('DOMContentLoaded', () => {
            createFloatingElements();
            updateClock();
            loadTheme();
            
            // Update every second
            setInterval(updateClock, 1000);
            
            // Theme switch event listeners
            document.getElementById('theme-light').addEventListener('click', () => setTheme('light'));
            document.getElementById('theme-dark').addEventListener('click', () => setTheme('dark'));
        });