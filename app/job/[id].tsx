import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import {
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  GraduationCap,
  MessageSquare,
  Mail,
  Phone,
  ArrowLeft,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { getJobById, Job } from "../../services/jobService";
import { db, auth } from "../../firebaseConfig"; // Import Firebase
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";

// Fallback fonts for cross-platform compatibility
const fontRegular = Platform.select({
  ios: "System",
  android: "Roboto",
  web: "system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
});
const fontMedium = Platform.select({
  ios: "System",
  android: "Roboto",
  web: "system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
});
const fontSemiBold = Platform.select({
  ios: "System",
  android: "Roboto",
  web: "system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
});
const fontBold = Platform.select({
  ios: "System",
  android: "Roboto",
  web: "system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
});

function JobLocationMap({ latitude, longitude, title }) {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title={title} />
      </MapView>
    </View>
  );
}

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const jobId = id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false); // Track if job is saved

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const jobData = await getJobById(jobId);
        if (jobData) {
          setJob(jobData);
          // Check if the job is already saved
          if (userId) {
            const savedJobRef = doc(
              db,
              "users",
              userId,
              "savedJobs",
              jobData.id
            );
            const savedJobDoc = await getDoc(savedJobRef);
            setIsSaved(savedJobDoc.exists()); // Set isSaved based on existing document
          }
        } else {
          setError("Job not found");
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, userId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const saveJobToDatabase = async () => {
    if (!job || !userId) return;

    try {
      const jobRef = doc(db, "users", userId, "savedJobs", job.id);
      await setDoc(jobRef, job);
      Alert.alert("Success", "Job saved successfully!");
      setIsSaved(true); // Update the state to reflect that the job is now saved
    } catch (error) {
      console.error("Error saving job:", error);
      Alert.alert("Error", "Failed to save job.");
    }
  };

  const handleSocialMediaPress = (url: string) => {
    Linking.openURL(url).catch((err) => {
      console.error("Error opening URL:", err);
      Alert.alert("Error", "Could not open the link");
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading job details...</Text>
      </View>
    );
  }

  if (error || !job) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "Job not found"}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <LinearGradient
            colors={["#4F46E5", "#7C3AED"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  const requirements = job.requirements
    ? typeof job.requirements === "string"
      ? [job.requirements]
      : job.requirements
    : ["No specific requirements listed"];

  const responsibilities = job.responsibilities
    ? typeof job.responsibilities === "string"
      ? [job.responsibilities]
      : job.responsibilities
    : ["No specific responsibilities listed"];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["rgba(79, 70, 229, 0.1)", "rgba(124, 58, 237, 0.05)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#6299CAFF" />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{job.title}</Text>
            <Text style={styles.employer}>{job.employer}</Text>
          </View>

          <View style={styles.highlights}>
            <View style={styles.highlightItem}>
              <MapPin size={20} color="#6299CAFF" />
              <Text style={styles.highlightText}>{job.location}</Text>
            </View>
            <View style={styles.highlightItem}>
              <Clock size={20} color="#6299CAFF" />
              <Text style={styles.highlightText}>{job.hours}</Text>
            </View>
            <View style={styles.highlightItem}>
              <DollarSign size={20} color="#6299CAFF" />
              <Text style={styles.highlightText}>{job.salary}</Text>
            </View>
          </View>

          {job.latitude && job.longitude && (
            <JobLocationMap
              latitude={job.latitude}
              longitude={job.longitude}
              title={job.title}
            />
          )}
        </View>

        <View style={styles.section}>
          <BlurView intensity={50} tint="light" style={styles.blurContainer}>
            <Text style={styles.sectionTitle}>About the Role</Text>
            <Text style={styles.description}>
              {job.aboutRole || job.description}
            </Text>
          </BlurView>
        </View>

        {job.schedule && (
          <View style={styles.section}>
            <BlurView intensity={50} tint="light" style={styles.blurContainer}>
              <Text style={styles.sectionTitle}>Schedule</Text>
              <View style={styles.infoItem}>
                <Calendar size={20} color="#6299CAFF" />
                <Text style={styles.infoText}>{job.schedule}</Text>
              </View>
            </BlurView>
          </View>
        )}

        <View style={styles.section}>
          <BlurView intensity={50} tint="light" style={styles.blurContainer}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            <View style={styles.infoItem}>
              <GraduationCap size={20} color="#6299CAFF" />
              <View style={styles.listContainer}>
                {requirements.map((req, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {req}
                  </Text>
                ))}
              </View>
            </View>
          </BlurView>
        </View>

        <View style={styles.section}>
          <BlurView intensity={50} tint="light" style={styles.blurContainer}>
            <Text style={styles.sectionTitle}>Responsibilities</Text>
            <View style={styles.listContainer}>
              {responsibilities.map((resp, index) => (
                <Text key={index} style={styles.listItem}>
                  • {resp}
                </Text>
              ))}
            </View>
          </BlurView>
        </View>

        {job.contact && (
          <View style={styles.section}>
            <BlurView intensity={50} tint="light" style={styles.blurContainer}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              {job.contact.messenger && (
                <View style={styles.contactItem}>
                  <MessageSquare size={20} color="#6299CAFF" />
                  <Text style={styles.contactText}>
                    {job.contact.messenger}
                  </Text>
                </View>
              )}
              {job.contact.email && (
                <View style={styles.contactItem}>
                  <Mail size={20} color="#6299CAFF" />
                  <Text style={styles.contactText}>{job.contact.email}</Text>
                </View>
              )}
              {job.contact.phone && (
                <View style={styles.contactItem}>
                  <Phone size={20} color="#6299CAFF" />
                  <Text style={styles.contactText}>{job.contact.phone}</Text>
                </View>
              )}
            </BlurView>
          </View>
        )}

        {job.socialMedia && (
          <View style={styles.section}>
            <BlurView intensity={50} tint="light" style={styles.blurContainer}>
              <Text style={styles.sectionTitle}>Follow Us</Text>
              <View style={styles.socialMediaContainer}>
                {job.socialMedia.facebook && (
                  <TouchableOpacity
                    style={styles.socialMediaButton}
                    onPress={() =>
                      handleSocialMediaPress(job.socialMedia.facebook)
                    }
                  >
                    <Facebook size={24} color="#6299CAFF" />
                  </TouchableOpacity>
                )}
                {job.socialMedia.instagram && (
                  <TouchableOpacity
                    style={styles.socialMediaButton}
                    onPress={() =>
                      handleSocialMediaPress(job.socialMedia.instagram)
                    }
                  >
                    <Instagram size={24} color="#6299CAFF" />
                  </TouchableOpacity>
                )}
                {job.socialMedia.twitter && (
                  <TouchableOpacity
                    style={styles.socialMediaButton}
                    onPress={() =>
                      handleSocialMediaPress(job.socialMedia.twitter)
                    }
                  >
                    <Twitter size={24} color="#6299CAFF" />
                  </TouchableOpacity>
                )}
                {job.socialMedia.linkedin && (
                  <TouchableOpacity
                    style={styles.socialMediaButton}
                    onPress={() =>
                      handleSocialMediaPress(job.socialMedia.linkedin)
                    }
                  >
                    <Linkedin size={24} color="#6299CAFF" />
                  </TouchableOpacity>
                )}
              </View>
            </BlurView>
          </View>
        )}

        <View style={styles.applyContainer}>
          <TouchableOpacity
            style={[styles.applyButton, isSaved ? styles.disabledButton : {}]}
            onPress={isSaved ? null : saveJobToDatabase} // Disable if already saved
          >
            <LinearGradient
              colors={["#CBDCEB", "#BADBF7FF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.applyButtonText}>
                {isSaved ? "Already Saved" : "Save Job"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gradientBackground: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingBottom: 16,
  },
  backButton: {
    paddingVertical: 8,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontFamily: fontBold,
    fontSize: 24,
    color: "#1a1a1a",
    marginBottom: 4,
  },
  employer: {
    fontFamily: fontMedium,
    fontSize: 16,
    color: "#4F46E5",
    marginBottom: 16,
  },
  highlights: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  highlightText: {
    fontFamily: fontMedium,
    fontSize: 14,
    color: "#444",
    marginLeft: 6,
  },
  mapContainer: {
    height: 250,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 16,
  },
  map: {
    flex: 1,
  },
  section: {
    marginVertical: 12,
  },
  blurContainer: {
    padding: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  sectionTitle: {
    fontFamily: fontSemiBold,
    fontSize: 18,
    color: "#1a1a1a",
    marginBottom: 12,
  },
  description: {
    fontFamily: fontRegular,
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  infoText: {
    fontFamily: fontRegular,
    fontSize: 15,
    color: "#444",
    marginLeft: 10,
    flex: 1,
  },
  listContainer: {
    flex: 1,
    marginLeft: 10,
  },
  listItem: {
    fontFamily: fontRegular,
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
    lineHeight: 22,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactText: {
    fontFamily: fontRegular,
    fontSize: 15,
    color: "#444",
    marginLeft: 10,
  },
  applyContainer: {
    marginTop: 24,
    marginBottom: 40,
    alignItems: "center",
  },
  applyButton: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#6299CAFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  disabledButton: {
    backgroundColor: "grey", // Style for disabled button
  },
  gradientButton: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    fontFamily: fontBold,
    fontSize: 16,
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  loadingText: {
    fontFamily: fontMedium,
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  errorText: {
    fontFamily: fontMedium,
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonText: {
    fontFamily: fontMedium,
    fontSize: 16,
    color: "#fff",
  },
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 12,
  },
  socialMediaButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(79, 70, 229, 0.1)",
  },
});
