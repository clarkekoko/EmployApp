import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { MapPin, Clock, Search } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import JobMap from "../../components/JobMap";
import { useAuth } from "../../context/AuthContext";
import { getAllJobs } from "../../services/jobService";
import { Job } from "../../types/job";

// Fallback fonts for cross-platform compatibility
const fontRegular = Platform.select({
  ios: "System",
  android: "Roboto",
  web: "system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
});
const fontBold = Platform.select({
  ios: "System",
  android: "Roboto",
  web: "system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
});

export default function HomeScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [showMap, setShowMap] = useState(true);
  const [mapKey, setMapKey] = useState(0);
  const [isMapError, setIsMapError] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const allJobs = await getAllJobs();
        setJobs(allJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Force map to refresh when showMap changes
  useEffect(() => {
    if (showMap) {
      setMapKey((prev) => prev + 1);
      setIsMapError(false);
    }
  }, [showMap]);

  // Filter jobs based on activeFilter and searchQuery
  const filteredJobs = jobs.filter((job) => {
    const matchesHoursFilter =
      activeFilter === "all" ||
      job.hours.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesSearchQuery =
      showMap ||
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.employer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesHoursFilter && matchesSearchQuery;
  });

  const JobCard = ({ job }: { job: Job }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        job.id
          ? router.push(`/job/${job.id}`)
          : Alert.alert("Error", "Job ID not found")
      }
    >
      <View style={styles.cardContent}>
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
        <Text style={styles.title}>Find Your Next Opportunity</Text>
      </View>

      <View style={styles.mapToggleContainer}>
        <TouchableOpacity
          style={[
            styles.mapToggleButton,
            showMap && styles.mapToggleButtonActive,
          ]}
          onPress={() => setShowMap(true)}
        >
          <LinearGradient
            colors={["#CBDCEB", "#BADBF7FF"]}
            style={styles.gradientToggle}
          >
            <Text style={styles.mapToggleText}>Map View</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.mapToggleButton,
            !showMap && styles.mapToggleButtonActive,
          ]}
          onPress={() => setShowMap(false)}
        >
          <LinearGradient
            colors={["#CBDCEB", "#BADBF7FF"]}
            style={styles.gradientToggle}
          >
            <Text style={styles.mapToggleText}>List View</Text>
          </LinearGradient>
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
                  setMapKey((prev) => prev + 1);
                  setIsMapError(false);
                }}
              >
                <LinearGradient
                  colors={["#CBDCEB", "#BADBF7FF"]}
                  style={styles.gradientToggle}
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

          <View style={styles.filterContainer}>
            {["all", "part-time", "full-time", "flexible"].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  activeFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No jobs match your filter
                </Text>
                <TouchableOpacity onPress={() => setActiveFilter("all")}>
                  <LinearGradient
                    colors={["#CBDCEB", "#BADBF7FF"]}
                    style={styles.gradientToggle}
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

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  greeting: {
    fontSize: 16,
    color: "#6B7280",
    fontFamily: fontRegular,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    fontFamily: fontBold,
    marginTop: 4,
  },
  mapToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  mapToggleButton: {
    padding: 6,
    borderRadius: 8,
    width: "48%",
  },
  mapToggleButtonActive: {
    backgroundColor: "#E5E7EB",
  },
  gradientToggle: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  mapToggleText: {
    fontSize: 14,
    fontFamily: fontBold,
    color: "#FFFFFF",
  },
  mapContainer: {
    flex: 1,
    height: 350,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 16,
    fontFamily: fontRegular,
    marginBottom: 8,
  },
  retryButton: {
    borderRadius: 8,
  },
  retryText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    fontFamily: fontBold,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    fontFamily: fontRegular,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  filterButtonActive: {
    backgroundColor: "#CBDCEB",
  },
  filterText: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: "#374151",
  },
  filterTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontBold,
    color: "#111827",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  content: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: fontBold,
    color: "#111827",
  },
  salary: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: "#10B981",
  },
  employer: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: "#6B7280",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: "#4B5563",
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    marginLeft: 4,
    fontSize: 13,
    fontFamily: fontRegular,
    color: "#6B7280",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: fontRegular,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: fontRegular,
    color: "#4B5563",
  },
});
