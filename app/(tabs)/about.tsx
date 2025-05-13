import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Mail, Phone, Globe, MessageCircle, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

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

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop' }}
          style={styles.headerImage}
        />
        <LinearGradient
        colors={['#CBDCEB', '#BADBF7FF']}
        start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.overlay}
        />
        <View style={styles.headerContent}>
          <Text style={styles.title}>About Employ</Text>
          <Text style={styles.subtitle}>Connecting Local Talent with Opportunities</Text>
        </View>
      </View>

      <View style={styles.content}>
        <BlurView intensity={80} tint="light" style={styles.glassCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.2)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientCard}
          >
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.text}>
              Employ is dedicated to bridging the gap between local businesses and young talent in your community. We believe in creating meaningful employment opportunities that work around your schedule and help you gain valuable experience.
            </Text>
          </LinearGradient>
        </BlurView>

        <Text style={styles.sectionTitle}>For Students</Text>
        <View style={styles.featureList}>
          <BlurView intensity={60} tint="light" style={styles.featureItem}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featureGradient}
            >
              <View style={styles.featureIconContainer}>
                <LinearGradient
        colors={['#CBDCEB', '#BADBF7FF']}
        start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.featureIcon}
                >
                  <Text style={styles.featureEmoji}>🎓</Text>
                </LinearGradient>
              </View>
              <Text style={styles.featureTitle}>Flexible Schedule</Text>
              <Text style={styles.featureText}>Find jobs that fit around your classes and study time</Text>
            </LinearGradient>
          </BlurView>

          <BlurView intensity={60} tint="light" style={styles.featureItem}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featureGradient}
            >
              <View style={styles.featureIconContainer}>
                <LinearGradient
        colors={['#CBDCEB', '#BADBF7FF']}
        start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.featureIcon}
                >
                  <Text style={styles.featureEmoji}>📍</Text>
                </LinearGradient>
              </View>
              <Text style={styles.featureTitle}>Local Opportunities</Text>
              <Text style={styles.featureText}>Work close to home or school</Text>
            </LinearGradient>
          </BlurView>

          <BlurView intensity={60} tint="light" style={styles.featureItem}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featureGradient}
            >
              <View style={styles.featureIconContainer}>
                <LinearGradient
        colors={['#CBDCEB', '#BADBF7FF']}
        start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.featureIcon}
                >
                  <Text style={styles.featureEmoji}>💼</Text>
                </LinearGradient>
              </View>
              <Text style={styles.featureTitle}>Gain Experience</Text>
              <Text style={styles.featureText}>Build your resume with real-world work experience</Text>
            </LinearGradient>
          </BlurView>
        </View>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactList}>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => Linking.openURL('mailto:support@employ.com')}
          >
            <LinearGradient
        colors={['#CBDCEB', '#BADBF7FF']}
        start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.contactIconBg}
            >
              <Mail size={20} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.contactText}>support@employ.com</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => Linking.openURL('tel:+1234567890')}
          >
            <LinearGradient
        colors={['#CBDCEB', '#BADBF7FF']}
        start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.contactIconBg}
            >
              <Phone size={20} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.contactText}>+63 (2) 1234 5678</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => Linking.openURL('https://employ.com')}
          >
            <LinearGradient
        colors={['#CBDCEB', '#BADBF7FF']}
        start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.contactIconBg}
            >
              <Globe size={20} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.contactText}>www.employ.com</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => Linking.openURL('https://m.me/employ')}
          >
            <LinearGradient
        colors={['#CBDCEB', '#BADBF7FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.contactIconBg}
            >
              <MessageCircle size={20} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.contactText}>Message us on Facebook</Text>
          </TouchableOpacity>
        </View>

        <BlurView intensity={80} tint="light" style={styles.glassCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.2)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientCard}
          >
            <Text style={styles.sectionTitle}>Privacy & Terms</Text>
            <Text style={styles.text}>
              We take your privacy seriously. By using Employ, you agree to our Terms of Service and Privacy Policy. We only collect and use information that helps us provide you with the best job matching experience.
            </Text>
            <View style={styles.linkContainer}>
              <TouchableOpacity>
                <LinearGradient
        colors={['#CBDCEB', '#BADBF7FF']}
        start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.linkButton}
                >
                  <Text style={styles.linkButtonText}>Privacy Policy</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity>
                <LinearGradient
        colors={['#CBDCEB', '#BADBF7FF']}
        start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.linkButton}
                >
                  <Text style={styles.linkButtonText}>Terms of Service</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </BlurView>
      </View>

      <LinearGradient
        colors={['#CBDCEB', '#BADBF7FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.footer}
      >
        <Text style={styles.footerText}> 2025 Employ. All rights reserved.</Text>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    height: 280,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  headerContent: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  title: {
    fontFamily: fontBold,
    fontSize: 32,
    color: '#4A628A',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fontRegular,
    fontSize: 16,
    color: '#4A628A',
  },
  content: {
    padding: 20,
  },
  glassCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  gradientCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  sectionTitle: {
    fontFamily: fontSemiBold,
    fontSize: 22,
    color: '#6299CAFF',
    marginBottom: 16,
    marginTop: 8,
  },
  text: {
    fontFamily: fontRegular,
    fontSize: 16,
    color: '#4A628A',
    lineHeight: 24,
  },
  featureList: {
    marginBottom: 32,
  },
  featureItem: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featureGradient: {
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
  },
  featureIconContainer: {
    marginBottom: 16,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureEmoji: {
    fontSize: 28,
  },
  featureTitle: {
    fontFamily: fontSemiBold,
    fontSize: 18,
    color: '#374357FF',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontFamily: fontRegular,
    fontSize: 14,
    color: '#82A2D8FF',
    textAlign: 'center',
  },
  contactList: {
    marginBottom: 32,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 0.6)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  contactIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactText: {
    fontFamily: fontMedium,
    fontSize: 16,
    color: '#333',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  linkButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  linkButtonText: {
    fontFamily: fontMedium,
    fontSize: 14,
    color: '#FFFFFF',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: fontRegular,
    fontSize: 14,
    color: '#FFFFFF',
  }
});