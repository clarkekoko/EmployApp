import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Platform, SafeAreaView, Alert, ActivityIndicator, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Clock, Filter, Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import JobMap from '../../components/JobMap';
import { useAuth } from '../../context/AuthContext';
import { getAllJobs } from '../../services/jobService';
import { Job } from '../../types/job';

// Fallback fonts for cross-platform compatibility
const fontRegular = Platform.select({
  ios: 'System',
  android: 'Roboto',
  web: 'system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif',
});
const fontMedium = Platform.select({
  ios: 'System',
  android: 'Roboto',
  web: 'system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif',
});
const fontSemiBold = Platform.select({
  ios: 'System',
  android: 'Roboto',
  web: 'system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif',
});
const fontBold = Platform.select({
  ios: 'System',
  android: 'Roboto',
  web: 'system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif',
});

export default function HomeScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showMap, setShowMap] = useState(true);
  const [mapKey, setMapKey] = useState(0); 
  const [isMapError, setIsMapError] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const allJobs = await getAllJobs();
        setJobs(allJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Force map to refresh when showMap changes
  useEffect(() => {
    if (showMap) {
      setMapKey(prev => prev + 1);
      setIsMapError(false);
    }
  }, [showMap]);

  // Filter jobs based on activeFilter and searchQuery
  const filteredJobs = jobs.filter(job => {
    // First apply the hours filter
    const matchesHoursFilter = activeFilter === 'all' || 
      job.hours.toLowerCase().includes(activeFilter.toLowerCase());
    
    // Then apply the search filter if we're not in map view and have a search query
    const matchesSearchQuery = showMap || !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.employer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesHoursFilter && matchesSearchQuery;
  });

  // Add prop types for JobCard
  const JobCard = ({ job }: { job: Job }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => job.id ? router.push(`/job/${job.id}`) : Alert.alert('Error', 'Job ID not found')}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.salary}>{job.salary}</Text>
      </View>
      <Text style={styles.employer}>{job.employer}</Text>
      <Text style={styles.description}>{job.description}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <MapPin size={16} color="#666" />
          <Text style={styles.footerText}>{job.location}</Text>
        </View>
        <View style={styles.footerItem}>
          <Clock size={16} color="#666" />
          <Text style={styles.footerText}>{job.hours}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleMapError = () => {
    setIsMapError(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading jobs...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning!</Text>
        <Text style={styles.title}>Find your next opportunity</Text>
      </View>

      <View style={styles.mapToggleContainer}>
        <TouchableOpacity
          style={[styles.mapToggleButton, showMap && styles.mapToggleButtonActive]}
          onPress={() => setShowMap(true)}
        >
          {showMap ? (
            <LinearGradient
              colors={['#4F46E5', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientToggle}
            >
              <Text style={[styles.mapToggleText, {color: '#FFFFFF', fontWeight: 'bold'}]}>Map View</Text>
            </LinearGradient>
          ) : (
            <Text style={styles.mapToggleText}>Map View</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mapToggleButton, !showMap && styles.mapToggleButtonActive]}
          onPress={() => setShowMap(false)}
        >
          {!showMap ? (
            <LinearGradient
              colors={['#4F46E5', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientToggle}
            >
              <Text style={[styles.mapToggleText, {color: '#FFFFFF', fontWeight: 'bold'}]}>List View</Text>
            </LinearGradient>
          ) : (
            <Text style={styles.mapToggleText}>List View</Text>
          )}
        </TouchableOpacity>
      </View>

      {showMap ? (
        <View style={styles.mapContainer}>
          {isMapError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Unable to load map</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => {
                  setMapKey(prev => prev + 1);
                  setIsMapError(false);
                }}
              >
                <LinearGradient
                  colors={['#4F46E5', '#7C3AED']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ padding: 10, borderRadius: 8 }}
                >
                  <Text style={styles.retryText}>Retry</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <JobMap key={mapKey} jobs={filteredJobs} onError={handleMapError} />
          )}
        </View>
      ) : (
        <>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={18} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search jobs..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
              />
            </View>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
            contentContainerStyle={styles.filterContainer}
          >
            {['all', 'part-time', 'full-time', 'flexible'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  activeFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                {activeFilter === filter ? (
                  <LinearGradient
                    colors={['#4F46E5', '#7C3AED']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 8, borderRadius: 20 }}
                  >
                    <Text style={[styles.filterText, {color: '#FFFFFF', fontWeight: 'bold'}]}>
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.filterText}>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No jobs match your filter</Text>
                <TouchableOpacity onPress={() => setActiveFilter('all')}>
                  <LinearGradient
                    colors={['#4F46E5', '#7C3AED']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 10, borderRadius: 8, marginTop: 12 }}
                  >
                    <Text style={styles.retryText}>View All Jobs</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
    backgroundColor: '#fff',
  },
  greeting: {
    fontFamily: fontRegular,
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontFamily: fontBold,
    fontSize: 24,
    color: '#1a1a1a',
    marginTop: 4,
  },
  mapToggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  mapToggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  mapToggleButtonActive: {
    backgroundColor: 'transparent',
  },
  gradientToggle: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  mapToggleText: {
    fontFamily: fontMedium,
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontMedium,
    fontSize: 14,
    color: '#333',
    height: 40,
  },
  filterScroll: {
    maxHeight: 50,
  },
  filterContainer: {
    padding: 20,
    paddingTop: 0,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  filterButtonActive: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  filterText: {
    fontFamily: fontMedium,
    fontSize: 14,
    color: '#666',
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontFamily: fontSemiBold,
    fontSize: 18,
    color: '#1a1a1a',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontFamily: fontSemiBold,
    fontSize: 18,
    color: '#1a1a1a',
    flex: 1,
    marginRight: 8,
  },
  salary: {
    fontFamily: fontBold,
    fontSize: 16,
    color: '#4F46E5',
  },
  employer: {
    fontFamily: fontMedium,
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  description: {
    fontFamily: fontRegular,
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: fontRegular,
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontFamily: fontMedium,
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
  },
  emptyStateText: {
    fontFamily: fontMedium,
    fontSize: 16,
    color: '#666',
  },
  mapContainer: {
    height: height * 0.6,
    width: width,
    marginBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  errorText: {
    fontFamily: fontMedium,
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  retryText: {
    fontFamily: fontMedium,
    fontSize: 14,
    color: '#fff',
  },
});