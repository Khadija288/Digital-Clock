   // Generate floating elements
        for (let i = 0; i < 12; i++) {
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
            
            document.body.appendChild(element);
        }
  // Simplified timezone mapping with user-friendly names
        const timezoneMap = {
            "Africa/Cairo": "Cairo, Egypt",
            "America/New_York": "New York, USA",
            "America/Los_Angeles": "Los Angeles, USA",
            "Europe/London": "London, UK",
            "Europe/Paris": "Paris, France",
            "Asia/Tokyo": "Tokyo, Japan",
            "Asia/Dubai": "Dubai, UAE",
            "Asia/Karachi": "Karachi, Pakistan",
            "Asia/Kolkata": "Kolkata, India",
            "Asia/Shanghai": "Shanghai, China",
            "Australia/Sydney": "Sydney, Australia",
            "Canada/Toronto": "Toronto, Canada",
            "Brazil/Sao_Paulo": "São Paulo, Brazil",
            "Africa/Johannesburg": "Johannesburg, South Africa",
            "Asia/Singapore": "Singapore",
            "Asia/Bangkok": "Bangkok, Thailand",
            "Asia/Seoul": "Seoul, South Korea",
            "Europe/Moscow": "Moscow, Russia",
            "Europe/Berlin": "Berlin, Germany",
            "Europe/Rome": "Rome, Italy",
            "Pacific/Auckland": "Auckland, New Zealand",
            "Asia/Riyadh": "Riyadh, Saudi Arabia",
            "Asia/Istanbul": "Istanbul, Turkey",
            "Asia/Jakarta": "Jakarta, Indonesia",
            "Asia/Manila": "Manila, Philippines",
            "Asia/Hong_Kong": "Hong Kong",
            "Asia/Taipei": "Taipei, Taiwan",
            "Asia/Dhaka": "Dhaka, Bangladesh"
        };
        
        // Country codes for flags
        const countryCodes = {
            "Africa/Cairo": "EG",
            "America/New_York": "US",
            "America/Los_Angeles": "US",
            "Europe/London": "UK",
            "Europe/Paris": "FR",
            "Asia/Tokyo": "JP",
            "Asia/Dubai": "AE",
            "Asia/Karachi": "PK",
            "Asia/Kolkata": "IN",
            "Asia/Shanghai": "CN",
            "Australia/Sydney": "AU",
            "Canada/Toronto": "CA",
            "Brazil/Sao_Paulo": "BR",
            "Africa/Johannesburg": "ZA",
            "Asia/Singapore": "SG",
            "Asia/Bangkok": "TH",
            "Asia/Seoul": "KR",
            "Europe/Moscow": "RU",
            "Europe/Berlin": "DE",
            "Europe/Rome": "IT",
            "Pacific/Auckland": "NZ",
            "Asia/Riyadh": "SA",
            "Asia/Istanbul": "TR",
            "Asia/Jakarta": "ID",
            "Asia/Manila": "PH",
            "Asia/Hong_Kong": "HK",
            "Asia/Taipei": "TW",
            "Asia/Dhaka": "BD"
        };
        
        // Get all available timezones
        function getTimezones() {
            try {
                return Intl.supportedValuesOf('timeZone');
            } catch (e) {
                // Fallback for older browsers
                return Object.keys(timezoneMap);
            }
        }
        
        // Populate timezone dropdown with simplified names
        function populateTimezones() {
            const timezones = getTimezones();
            const select = document.getElementById('timezone-select');
            
            // Get user's local timezone
            const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            let defaultTimezone = "Africa/Cairo";
            
            // Add timezones to dropdown
            timezones.forEach(tz => {
                const option = document.createElement('option');
                option.value = tz;
                
                // Use simplified name if available, otherwise use the original
                option.textContent = timezoneMap[tz] || tz.split('/').pop().replace(/_/g, ' ');
                
                select.appendChild(option);
                
                // Check if this is the user's local timezone
                if (tz === localTimezone) {
                    defaultTimezone = tz;
                }
            });
            
            // Set default to user's local timezone
            select.value = defaultTimezone;
            updateFlag(defaultTimezone);
            document.getElementById('current-timezone').textContent = 
                timezoneMap[defaultTimezone] || defaultTimezone.split('/').pop().replace(/_/g, ' ');
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
        
        // Update flag based on timezone
        function updateFlag(timezone) {
            const flag = document.getElementById('selected-flag');
            const countryCode = countryCodes[timezone];
            
            if (countryCode) {
                flag.textContent = countryCode;
                
                // Special flags
                if (countryCode === 'US') {
                    flag.style.background = 'linear-gradient(to right, #B22234 33%, white 33%, white 66%, #3C3B6E 66%)';
                } else if (countryCode === 'UK') {
                    flag.style.background = 'linear-gradient(to bottom, #012169, #C8102E, #FFFFFF)';
                } else if (countryCode === 'FR') {
                    flag.style.background = 'linear-gradient(to right, #002395 33%, white 33%, white 66%, #ED2939 66%)';
                } else {
                    // For others, just use a gradient
                    flag.style.background = 'linear-gradient(135deg, #4e82ff, #ff4ecd)';
                }
            } else {
                // Default styling for unknown countries
                flag.textContent = timezone.split('/')[0].substring(0, 2).toUpperCase();
                flag.style.background = 'linear-gradient(135deg, #4e82ff, #ff4ecd)';
            }
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
            
            // Update timezone display name
            document.getElementById('current-timezone').textContent = 
                timezoneMap[timezone] || timezone.split('/').pop().replace(/_/g, ' ');
            
            // Update flag
            updateFlag(timezone);
        }
        
        // Initial setup
        document.addEventListener('DOMContentLoaded', () => {
            populateTimezones();
            
            // Initial clock update
            updateClock();
            
            // Update every second
            setInterval(updateClock, 1000);
            
            // Timezone change event
            document.getElementById('timezone-select').addEventListener('change', updateClock);
        });