import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

type Job = {
  id: string;
  title: string;
  employer: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  hours: string;
  salary: string;
};

type JobMapProps = {
  jobs: Job[];
  onError?: () => void;
};

const JobMap: React.FC<JobMapProps> = ({ jobs, onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { width, height } = Dimensions.get('window');
  
  // Convert jobs to a JavaScript string representation that can be injected into WebView
  const jobsData = JSON.stringify(
    jobs.map(job => ({
      id: job.id,
      title: job.title,
      employer: job.employer,
      location: job.location,
      latitude: job.latitude,
      longitude: job.longitude,
      salary: job.salary
    }))
  );

  // Center map on the average of all job coordinates, or default to Manila if no coordinates
  const calculateMapCenter = () => {
    if (jobs.length === 0) return [14.5995, 120.9842]; // Default: Manila
    
    const validJobs = jobs.filter(job => 
      typeof job.latitude === 'number' && 
      typeof job.longitude === 'number' && 
      !isNaN(job.latitude) && 
      !isNaN(job.longitude)
    );
    
    if (validJobs.length === 0) return [14.5995, 120.9842]; // Default: Manila
    
    const sumLat = validJobs.reduce((sum, job) => sum + job.latitude, 0);
    const sumLng = validJobs.reduce((sum, job) => sum + job.longitude, 0);
    
    return [sumLat / validJobs.length, sumLng / validJobs.length];
  };
  
  const mapCenter = calculateMapCenter();
  
  // Generate unique ID for this map instance to avoid caching issues
  const mapId = React.useMemo(() => `map_${Date.now()}`, []);

  // Handle messages from WebView
  const handleMessage = (event: WebViewMessageEvent) => {
    const { data } = event.nativeEvent;
    
    if (data === 'Map initialized' || data === 'Map loaded' || data === 'Map fully loaded') {
      setIsLoading(false);
    } else if (data.includes('error')) {
      console.error('Map error:', data);
      setHasError(true);
      setIsLoading(false);
      if (onError) {
        onError();
      }
    }
  };

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Job Map</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obscp+Wnk=" crossorigin=""/>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
      <style>
        html, body { 
          width: 100%;
          height: 100%;
          margin: 0; 
          padding: 0;
          overflow: hidden;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        #${mapId} { 
          width: 100%; 
          height: 100%; 
          z-index: 1;
          background: #f8f8f8;
        }
        .marker-popup {
          font-size: 14px;
        }
        .marker-popup h3 {
          margin: 0 0 5px 0;
          color: #007AFF;
        }
        .marker-popup p {
          margin: 3px 0;
        }
        .marker-popup .employer {
          font-weight: 500;
          color: #333;
        }
        .marker-popup .salary {
          font-weight: 600;
          color: #007AFF;
        }
        .marker-popup .location {
          color: #666;
          display: flex;
          align-items: center;
        }
      </style>
    </head>
    <body>
      <div id="${mapId}"></div>
      <script>
        // Parse jobs data from React Native
        let jobs = [];
        try {
          jobs = ${jobsData};
        } catch (e) {
          console.error('Error parsing jobs data:', e);
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('Error parsing jobs data: ' + e.message);
          }
        }
        
        // Initialize map
        let map;
        try {
          map = L.map('${mapId}', {
            zoomControl: true,
            attributionControl: true,
            minZoom: 5,
            maxZoom: 18
          }).setView([${mapCenter[0]}, ${mapCenter[1]}], 12);
          
          // Add tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
          
          // Custom marker icon
          const customIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
          });
          
          // Add markers for each job
          jobs.forEach(job => {
            if (job.latitude && job.longitude && !isNaN(job.latitude) && !isNaN(job.longitude)) {
              const marker = L.marker([job.latitude, job.longitude], { icon: customIcon }).addTo(map);
              
              const popupContent = \`
                <div class="marker-popup">
                  <h3>\${job.title}</h3>
                  <p class="employer">\${job.employer}</p>
                  <p class="salary">\${job.salary}</p>
                  <p class="location">\${job.location}</p>
                </div>
              \`;
              
              marker.bindPopup(popupContent);
              
              // Open popup on click
              marker.on('click', function() {
                marker.openPopup();
              });
            }
          });
          
          // Force map to render correctly
          setTimeout(() => {
            map.invalidateSize();
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage('Map initialized');
            }
          }, 200);
        } catch (e) {
          console.error('Error initializing map:', e);
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('Map initialization error: ' + e.message);
          }
        }
        
        // Make map responsive to container size changes
        window.addEventListener('resize', function() {
          if (map) map.invalidateSize();
        });
        
        // Notify React Native when map is loaded
        window.addEventListener('load', function() {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('Map loaded');
          }
        });
        
        // Notify React Native when map is fully rendered
        if (map) {
          map.on('load', function() {
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage('Map fully loaded');
            }
          });
        }
      </script>
    </body>
    </html>
  `;
  
  // If there's an error, don't render the map
  if (hasError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={styles.webView}
        onMessage={handleMessage}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
          setHasError(true);
          if (onError) {
            onError();
          }
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView HTTP error:', nativeEvent);
          setHasError(true);
          if (onError) {
            onError();
          }
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading map...</Text>
          </View>
        )}
      />
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  webView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 0.7)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  }
});

export default JobMap;
