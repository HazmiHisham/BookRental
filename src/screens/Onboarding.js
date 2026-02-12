import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Onboarding({ onComplete }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1673115380140-d1941bcf21c7' }}
            style={styles.image}
          />
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Rent Books, Don't Buy</Text>
          <Text style={styles.subtitle}>
            Discover books from local owners. Read what you love, return when you're done, and help build a sharing community.
          </Text>
        </View>

        {/* Role Selection */}
        <View style={styles.roleSection}>
          <Text style={styles.roleTitle}>Choose your role</Text>

          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => onComplete('reader')}
          >
            <View style={styles.roleIcon}>
              <Ionicons name="book-outline" size={24} color="#2563eb" />
            </View>
            <View style={styles.roleInfo}>
              <Text style={styles.roleName}>I'm a Reader</Text>
              <Text style={styles.roleDescription}>
                Browse and rent books from local owners
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => onComplete('owner')}
          >
            <View style={styles.roleIcon}>
              <Ionicons name="people-outline" size={24} color="#2563eb" />
            </View>
            <View style={styles.roleInfo}>
              <Text style={styles.roleName}>I'm a Book Owner</Text>
              <Text style={styles.roleDescription}>
                List your books for rent and earn money
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  imageContainer: {
    width: '100%',
    height: 256,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  roleSection: {
    gap: 16,
  },
  roleTitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  roleCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  roleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleInfo: {
    flex: 1,
  },
  roleName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});