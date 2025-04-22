import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Job } from '../services/jobService';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';

type JobMapProps = {
  jobs: Job[];
  onError?: () => void;
};

const JobMap: React.FC<JobMapProps> = ({ jobs, onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { width, height } = Dimensions.get('window');
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setHasError(true);
          if (onError) onError();
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
        setIsLoading(false);
      } catch (error) {
        console.error('Error getting location:', error);
        setHasError(true);
        if (onError) onError();
      }
    })();
  }, []);

  // Calculate initial region based on jobs or user location
  const getInitialRegion = () => {
    if (jobs.length === 0) {
      return {
        latitude: 14.5995,
        longitude: 120.9842,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    const validJobs = jobs.filter(job => 
      typeof job.latitude === 'number' && 
      typeof job.longitude === 'number' && 
      !isNaN(job.latitude) && 
      !isNaN(job.longitude)
    );

    if (validJobs.length === 0) {
      return {
        latitude: 14.5995,
        longitude: 120.9842,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    const sumLat = validJobs.reduce((sum, job) => sum + job.latitude, 0);
    const sumLng = validJobs.reduce((sum, job) => sum + job.longitude, 0);
    
    return {
      latitude: sumLat / validJobs.length,
      longitude: sumLng / validJobs.length,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  };

  if (hasError) {
    return null;
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={getInitialRegion()}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onPress={() => setSelectedJob(null)}
          >
            {jobs.map((job) => {
              if (job.latitude && job.longitude && !isNaN(job.latitude) && !isNaN(job.longitude)) {
                return (
                  <Marker
                    key={job.id}
                    coordinate={{
                      latitude: job.latitude,
                      longitude: job.longitude,
                    }}
                    onPress={() => setSelectedJob(job)}
                  />
                );
              }
              return null;
            })}
          </MapView>

          {selectedJob && (
            <View style={styles.popupContainer}>
              <View style={styles.popupContent}>
                <Text style={styles.popupTitle}>{selectedJob.title}</Text>
                <Text style={styles.popupEmployer}>{selectedJob.employer}</Text>
                <View style={styles.popupDetails}>
                  <Text style={styles.popupLocation}>{selectedJob.location}</Text>
                  <Text style={styles.popupSalary}>{selectedJob.salary}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.applyButton}
                  onPress={() => {
                    router.push(`/job/${selectedJob.id}`);
                    setSelectedJob(null);
                  }}
                >
                  <LinearGradient
                    colors={['#4F46E5', '#7C3AED']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.applyButtonText}>View Details</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.popupArrow} />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 12,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  popupContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 250,
    zIndex: 1000,
    pointerEvents: 'auto',
  },
  popupContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  popupArrow: {
    position: 'absolute',
    top: -10,
    right: 20,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [{ rotate: '180deg' }],
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  popupEmployer: {
    fontSize: 14,
    color: '#4F46E5',
    marginBottom: 8,
  },
  popupDetails: {
    marginBottom: 12,
  },
  popupLocation: {
    fontSize: 13,
    color: '#444',
    marginBottom: 4,
  },
  popupSalary: {
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
  },
  applyButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default JobMap;

