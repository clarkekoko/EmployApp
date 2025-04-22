import { Tabs } from 'expo-router';
import { Home, User, Info, Map } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, View, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { getAllJobs } from '../../services/jobService';

// Custom tab bar icon with gradient effect
const GradientIcon = ({ 
  Icon, 
  color, 
  size, 
  isFocused 
}: { 
  Icon: any; 
  color: string; 
  size: number; 
  isFocused: boolean;
}) => {
  if (isFocused) {
    return (
      <View style={styles.tabIconWrapper}>
        <LinearGradient
          colors={['#4F46E5', '#7C3AED']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <Icon size={size - 4} color="#FFFFFF" />
        </LinearGradient>
      </View>
    );
  }
  return <Icon size={size} color={color} />;
};

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Use setTimeout to ensure navigation happens after mount
      const timer = setTimeout(() => {
        router.replace('/(auth)/sign-in');
      }, 0);
      return () => clearTimeout(timer);
    } else {
      getAllJobs().catch(err => {
        console.error('Error fetching jobs:', err);
      });
    }
  }, [user, router]);

  // If still loading auth state, return null to avoid flashing content
  if (!user) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          left: 24,
          right: 24,
          height: 64,
          borderRadius: 32,
          paddingBottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          paddingHorizontal: 16,
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
          fontWeight: '600',
          fontSize: 11,
        },
        tabBarBackground: () => (
          <BlurView 
            intensity={50} 
            tint="light" 
            style={StyleSheet.absoluteFill}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <GradientIcon Icon={Home} color={color} size={size} isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <GradientIcon Icon={User} color={color} size={size} isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, size, focused }) => (
            <GradientIcon Icon={Info} color={color} size={size} isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size, focused }) => (
            <GradientIcon Icon={Map} color={color} size={size} isFocused={focused} />
          ),
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBackground: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5046E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});

