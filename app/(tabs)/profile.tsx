import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Settings, LogOut } from "lucide-react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Material Icons
import { useAuth } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { db } from "../../firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Fetch saved jobs from Firestore
  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (user) {
        try {
          const savedJobsRef = collection(db, "users", user.uid, "savedJobs");
          const snapshot = await getDocs(savedJobsRef);
          const jobs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSavedJobs(jobs);

          // Start fade-in animation
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        } catch (error) {
          console.error("Error fetching saved jobs:", error);
        }
      }
    };

    fetchSavedJobs();
  }, [user]);

  const navigateToJobDetails = (jobId) => {
    router.push(`job/${jobId}`);
  };

  const removeJob = async (jobId) => {
    if (user) {
      try {
        await deleteDoc(doc(db, "users", user.uid, "savedJobs", jobId));
        setSavedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      } catch (error) {
        console.error("Error removing job:", error);
      }
    }
  };

  const confirmRemoveJob = (jobId) => {
    Alert.alert(
      "Remove Job",
      "Are you sure you want to remove this job from saved jobs?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => removeJob(jobId) },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#CBDCEB", "#BADBF7FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <BlurView intensity={20} tint="light" style={styles.headerBlur}>
            <View style={styles.headerContent}>
              <Image
                source={{
                  uri: "https://i.pinimg.com/474x/ce/f2/ae/cef2aeabb3aff19605a2a952b276ac81.jpg",
                }}
                style={styles.avatar}
              />
              <Text style={styles.name}>
                {user?.email?.split("@")[0] || "User"}
              </Text>
              <Text style={styles.location}>Antipolo Rizal</Text>
            </View>
          </BlurView>
        </View>
      </LinearGradient>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Applications</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{savedJobs.length}</Text>
          <Text style={styles.statLabel}>Saved Jobs</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Interviews</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Jobs</Text>
        <Animated.View style={{ opacity: fadeAnim }}>
          {savedJobs.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <TouchableOpacity
                style={styles.jobInfo}
                onPress={() => navigateToJobDetails(job.id)}
              >
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobEmployer}>{job.employer}</Text>
              </TouchableOpacity>
              <Text style={styles.jobStatus}>{job.status}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmRemoveJob(job.id)}
              >
                <Icon name="delete" size={24} color="#FF3B30" />{" "}
                {/* Trash can icon */}
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Settings size={24} color="#1a1a1a" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, styles.logoutButton]}
          onPress={handleSignOut}
        >
          <LogOut size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerGradient: {
    paddingTop: 60, // Adjust for status bar
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerBlur: {
    borderRadius: 20,
    overflow: "hidden",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerContent: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.6)",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6299CAFF",
  },
  statLabel: {
    color: "#666",
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    height: "70%",
    backgroundColor: "#eee",
    alignSelf: "center",
  },
  section: {
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1a1a1a",
  },
  jobCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#1a1a1a",
  },
  jobEmployer: {
    fontSize: 14,
    color: "#666",
  },
  jobStatus: {
    fontWeight: "500",
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(0, 122, 255, 0.15)",
    color: "#007aff",
  },
  deleteButton: {
    padding: 8,
  },
  menuSection: {
    padding: 20,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#1a1a1a",
  },
  logoutButton: {
    marginTop: 6,
    borderBottomWidth: 0,
  },
  logoutText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "500",
  },
});
