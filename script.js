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
        }
        
        // Initial call
        updateClock();
        
        // Update every second
        setInterval(updateClock, 1000);
        
        // Theme switching functionality
        document.getElementById('theme-light').addEventListener('click', function() {
            document.body.style.background = 'linear-gradient(135deg, #8EC5FC, #E0C3FC)';
            document.querySelector('.container').style.background = 'rgba(255, 255, 255, 0.8)';
            document.querySelector('.container').style.color = '#333';
            document.querySelector('.title').style.color = '#444';
            document.querySelector('.title').style.textShadow = '0 0 10px rgba(255, 255, 255, 0.7)';
            document.querySelectorAll('.time-value').forEach(el => {
                el.style.color = '#333';
                el.style.textShadow = '0 0 10px rgba(100, 100, 255, 0.5)';
            });
            document.querySelectorAll('.time-label').forEach(el => el.style.color = '#555');
            document.querySelectorAll('.date-item').forEach(el => el.style.color = '#444');
            document.querySelector('.footer').style.color = '#555';
        });
        
        document.getElementById('theme-dark').addEventListener('click', function() {
            document.body.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)';
            document.querySelector('.container').style.background = 'rgba(25, 25, 50, 0.4)';
            document.querySelector('.container').style.color = '#fff';
            document.querySelector('.title').style.color = '#e0e0ff';
            document.querySelector('.title').style.textShadow = '0 0 10px rgba(78, 130, 255, 0.5)';
            document.querySelectorAll('.time-value').forEach(el => {
                el.style.color = '#fff';
                el.style.textShadow = '0 0 10px rgba(78, 130, 255, 0.7)';
            });
            document.querySelectorAll('.time-label').forEach(el => el.style.color = '#a0a0d0');
            document.querySelectorAll('.date-item').forEach(el => el.style.color = '#b0b0e0');
            document.querySelector('.footer').style.color = '#9090c0';
        });
    