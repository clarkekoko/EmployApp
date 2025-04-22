import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Search as SearchIcon, MapPin, Clock, Filter } from 'lucide-react-native';

const searchResults = [
  {
    id: '1',
    title: 'Store Assistant',
    employer: 'Mini Mart',
    description: 'Help with inventory and customer service',
    location: 'Poblacion',
    hours: 'Flexible',
    salary: '₱500/day',
  },
  {
    id: '2',
    title: 'Social Media Manager',
    employer: 'Local Cafe',
    description: 'Manage social media accounts and create content',
    location: 'San Roque',
    hours: 'Fixed',
    salary: '₱15,000/month',
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs, skills, or locations"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Popular Filters</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          >
            {['Part-time', 'Full-time', 'Flexible', 'No Experience', 'Student-friendly'].map((filter) => (
              <TouchableOpacity key={filter} style={styles.filterChip}>
                <Text style={styles.filterChipText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.resultsSection}>
          <Text style={styles.resultsTitle}>Search Results</Text>
          {searchResults.map((job) => (
            <TouchableOpacity key={job.id} style={styles.jobCard}>
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
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#1a1a1a',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1a1a1a',
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#666',
  },
  resultsSection: {
    gap: 16,
  },
  resultsTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1a1a1a',
  },
  jobCard: {
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
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1a1a1a',
  },
  salary: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#007AFF',
  },
  employer: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
});