import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 = credentials, 2 = profile info
  const { signUp, error } = useAuth();
  const router = useRouter();

  const handleNextStep = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    // Move to profile creation
    setCurrentStep(2);
  };

  const handleSignUp = async () => {
    if (!displayName) {
      Alert.alert('Error', 'Please provide at least a display name');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Include profile data with sign up
      const result = await signUp(email, password, {
        displayName,
        location: location || '',
        bio: bio || '',
      });
      
      if (result.success) {
        Alert.alert(
          'Success', 
          'Your account has been created successfully!',
          [{ text: 'Sign In', onPress: () => router.push('/(auth)/sign-in') }]
        );
      } else {
        Alert.alert('Error', result.message || 'Failed to create account');
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const renderCredentialsStep = () => (
    <>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to start using EmpleoApp</Text>
      
      {error && (
        <View style={styles.errorContainer}>
          <Feather name="alert-circle" size={16} color="#FF3B30" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <View style={styles.inputContainer}>
        <Feather name="mail" size={20} color="#777" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#777" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity 
          onPress={() => setShowPassword(!showPassword)}
          style={styles.passwordToggle}
        >
          <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#777" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#777" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleNextStep}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
          <Text style={styles.signupLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderProfileStep = () => (
    <>
      <Text style={styles.title}>Create Your Profile</Text>
      <Text style={styles.subtitle}>Tell us a bit about yourself to get started</Text>
      
      <View style={styles.inputContainer}>
        <Feather name="user" size={20} color="#777" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={displayName}
          onChangeText={setDisplayName}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Feather name="map-pin" size={20} color="#777" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Location (City, State)"
          placeholderTextColor="#999"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      
      <View style={[styles.inputContainer, styles.bioInputContainer]}>
        <Feather name="file-text" size={20} color="#777" style={styles.inputIcon} />
        <TextInput
          style={[styles.input, styles.bioInput]}
          placeholder="Tell us about yourself..."
          placeholderTextColor="#999"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Complete Sign Up</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.backButton} onPress={() => setCurrentStep(1)}>
        <Feather name="arrow-left" size={16} color="#666" />
        <Text style={styles.backButtonText}>Back to Account Details</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={['#4F46E5', '#7C3AED']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        />
        
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://i.imgur.com/RtQrVTg.png' }} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={styles.appName}>EmpleoApp</Text>
        </View>
        
        <BlurView intensity={80} tint="light" style={styles.formContainer}>
          {currentStep === 1 ? renderCredentialsStep() : renderProfileStep()}
        </BlurView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginHorizontal: 20,
    marginTop: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  errorText: {
    color: '#FF3B30',
    marginLeft: 8,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  bioInputContainer: {
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  inputIcon: {
    marginRight: 8,
    marginTop: Platform.OS === 'android' ? 14 : 0,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    color: '#1F2937',
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  passwordToggle: {
    padding: 8,
  },
  button: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    color: '#6B7280',
    marginRight: 4,
  },
  signupLink: {
    color: '#4F46E5',
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 8,
  },
  backButtonText: {
    color: '#6B7280',
    marginLeft: 8,
  },
});
