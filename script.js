
        // Get all available timezones
        function getTimezones() {
            try {
                // Modern browsers support this method
                return Intl.supportedValuesOf('timeZone');
            } catch (e) {
                // Fallback for older browsers
                return [
                    'UTC', 'GMT', 'EST', 'PST', 'CST', 'MST', 
                    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 
                    'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 
                    'Asia/Karachi', 'Asia/Dubai', 'Australia/Sydney',
                    'America/New_York', 'America/Los_Angeles', 'America/Chicago',
                    'America/Toronto', 'America/Vancouver', 'Pacific/Auckland',
                    'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Lagos'
                ];
            }
        }
        
        // Populate timezone dropdown
        function populateTimezones() {
            const timezones = getTimezones();
            const select = document.getElementById('timezone-select');
            const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            
            // Add timezones to dropdown
            timezones.forEach(tz => {
                const option = document.createElement('option');
                option.value = tz;
                option.textContent = tz;
                if (tz === 'Africa/Cairo') {
                    option.textContent = 'Africa/Cairo (Egypt)';
                }
                if (tz === localTimezone) {
                    option.selected = true;
                    document.getElementById('current-timezone').textContent = tz;
                }
                select.appendChild(option);
            });
        }
        
        // Format time for a specific timezone
        function getTimeForTimezone(timezone) {
            const now = new Date();
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: timezone
            };
            
            // Format time
            const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
            const [hours, minutes, seconds] = timeStr.split(':');
            
            // Format date
            const dateOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                timeZone: timezone
            };
            const dateStr = new Intl.DateTimeFormat('en-US', dateOptions).format(now);
            const [weekday, month, day, year] = dateStr.replace(',', '').split(' ');
            
            return {
                hours: hours.padStart(2, '0'),
                minutes: minutes.padStart(2, '0'),
                seconds: seconds.padStart(2, '0'),
                weekday: weekday.toUpperCase(),
                date: `${day} ${month.toUpperCase()} ${year}`
            };
        }
        
        // Update clock display
        function updateClock() {
            const timezone = document.getElementById('timezone-select').value;
            const timeData = getTimeForTimezone(timezone);
            
            document.getElementById('hours').textContent = timeData.hours;
            document.getElementById('minutes').textContent = timeData.minutes;
            document.getElementById('seconds').textContent = timeData.seconds;
            document.getElementById('day').textContent = timeData.weekday;
            document.getElementById('date').textContent = timeData.date;
            document.getElementById('current-timezone').textContent = timezone;
            
            // Update flag based on timezone
            const flag = document.getElementById('selected-flag');
            if (timezone.includes('Cairo')) {
                flag.textContent = 'EG';
                flag.style.background = '#CE1126';
            } else if (timezone.includes('New_York')) {
                flag.textContent = 'US';
                flag.style.background = 'linear-gradient(to right, #B22234 33%, white 33%, white 66%, #3C3B6E 66%)';
            } else if (timezone.includes('London')) {
                flag.textContent = 'UK';
                flag.style.background = 'linear-gradient(to right, #00247D, white, #CF142B)';
            } else {
                flag.textContent = timezone.split('/')[0].substring(0, 2).toUpperCase();
                flag.style.background = '#4e82ff';
            }
        }
        
        // Initial setup
        document.addEventListener('DOMContentLoaded', () => {
            populateTimezones();
            
            // Set Egypt as default if available
            const egyptOption = document.querySelector('option[value="Africa/Cairo"]');
            if (egyptOption) {
                egyptOption.selected = true;
            }
            
            // Initial clock update
            updateClock();
            
            // Update every second
            setInterval(updateClock, 1000);
            
            // Timezone change event
            document.getElementById('timezone-select').addEventListener('change', updateClock);
        });
    