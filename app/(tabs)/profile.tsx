import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Settings, BookmarkCheck, Briefcase as BriefcaseSearch, LogOut } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  
  const savedJobs = [
    {
      id: '1',
      title: 'Store Assistant',
      employer: 'Mini Mart',
      status: 'Saved',
    },
    {
      id: '2',
      title: 'Social Media Manager',
      employer: 'Local Cafe',
      status: 'Applied',
    },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      // The auth state change will trigger redirection in the tab layout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4F46E5', '#7C3AED']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <BlurView intensity={20} tint="light" style={styles.headerBlur}>
            <View style={styles.headerContent}>
              <Image
                source={{ uri: 'https://i.pinimg.com/474x/ce/f2/ae/cef2aeabb3aff19605a2a952b276ac81.jpg' }}
                style={styles.avatar}
              />
              <Text style={styles.name}>{user?.email?.split('@')[0] || 'User'}</Text>
              <Text style={styles.location}>Antipolo Rizal</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </LinearGradient>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Applications</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Saved Jobs</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Interviews</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Activity</Text>
        {savedJobs.map((job) => (
          <TouchableOpacity key={job.id} style={styles.jobCard}>
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobEmployer}>{job.employer}</Text>
            </View>
            <Text style={[
              styles.jobStatus,
              job.status === 'Applied' ? styles.statusApplied : styles.statusSaved
            ]}>
              {job.status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Settings size={24} color="#1a1a1a" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <BookmarkCheck size={24} color="#1a1a1a" />
          <Text style={styles.menuText}>Saved Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <BriefcaseSearch size={24} color="#1a1a1a" />
          <Text style={styles.menuText}>Job Preferences</Text>
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
    backgroundColor: '#fff',
  },
  headerGradient: {
    paddingTop: 60, // Adjust for status bar
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerBlur: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerContent: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  statLabel: {
    color: '#666',
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#eee',
    alignSelf: 'center',
  },
  section: {
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  jobCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
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
    fontWeight: '600',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  jobEmployer: {
    fontSize: 14,
    color: '#666',
  },
  jobStatus: {
    fontWeight: '500',
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusApplied: {
    backgroundColor: 'rgba(52, 199, 89, 0.15)',
    color: '#34c759',
  },
  statusSaved: {
    backgroundColor: 'rgba(0, 122, 255, 0.15)',
    color: '#007aff',
  },
  menuSection: {
    padding: 20,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#1a1a1a',
  },
  logoutButton: {
    marginTop: 6,
    borderBottomWidth: 0,
  },
  logoutText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
  },
});