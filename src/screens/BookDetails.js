import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BookDetails({ route, navigation }) {
  const { bookId } = route.params;

  // Mock data - in real app, fetch by bookId
  const book = {
    id: bookId,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf',
    price: 3,
    priceUnit: 'week',
    available: true,
    category: 'Fiction',
    description: 'A dazzling novel about all the choices that go into a life well lived. Somewhere out beyond the edge of the universe there is a library that contains an infinite number of books, each one the story of another reality.',
    condition: 'Like New',
    pages: 304,
    language: 'English',
    owner: {
      name: 'Sarah Johnson',
      rating: 4.8,
      distance: '0.5 mi',
      totalBooks: 12,
      joinedDate: 'Jan 2025',
    },
  };

  const handleRent = () => {
    // Handle rent action
    alert('Rental confirmation coming soon!');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Book Cover */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: book.cover }} style={styles.cover} />
          {!book.available && (
            <View style={styles.rentedOverlay}>
              <View style={styles.rentedBadge}>
                <Text style={styles.rentedText}>Currently Rented</Text>
              </View>
            </View>
          )}
        </View>

        {/* Title & Author */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <View style={styles.badges}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{book.category}</Text>
            </View>
            <View style={[styles.statusBadge, book.available ? styles.available : styles.rented]}>
              <Text style={[styles.statusText, book.available ? styles.availableText : styles.rentedStatusText]}>
                {book.available ? 'Available' : 'Rented'}
              </Text>
            </View>
          </View>
        </View>

        {/* Price Card */}
        <View style={styles.priceCard}>
          <View style={styles.priceIconContainer}>
            <Ionicons name="cash-outline" size={24} color="#2563eb" />
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.priceLabel}>Rental Price</Text>
            <Text style={styles.priceAmount}>
              ${book.price}
              <Text style={styles.priceUnit}>/{book.priceUnit}</Text>
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{book.description}</Text>
        </View>

        {/* Book Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Book Details</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Condition</Text>
              <Text style={styles.detailValue}>{book.condition}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Pages</Text>
              <Text style={styles.detailValue}>{book.pages}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Language</Text>
              <Text style={styles.detailValue}>{book.language}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Format</Text>
              <Text style={styles.detailValue}>Paperback</Text>
            </View>
          </View>
        </View>

        {/* Owner Info */}
        <View style={styles.ownerCard}>
          <Text style={styles.sectionTitle}>Book Owner</Text>
          <View style={styles.ownerInfo}>
            <View style={styles.ownerAvatar}>
              <Text style={styles.ownerInitial}>{book.owner.name.charAt(0)}</Text>
            </View>
            <View style={styles.ownerDetails}>
              <View style={styles.ownerHeader}>
                <Text style={styles.ownerName}>{book.owner.name}</Text>
                <TouchableOpacity>
                  <Ionicons name="chatbubble-outline" size={20} color="#2563eb" />
                </TouchableOpacity>
              </View>
              <View style={styles.ownerStats}>
                <View style={styles.ownerStat}>
                  <Ionicons name="star" size={14} color="#facc15" />
                  <Text style={styles.ownerStatText}>{book.owner.rating}</Text>
                </View>
                <View style={styles.ownerStat}>
                  <Ionicons name="location-outline" size={14} color="#666" />
                  <Text style={styles.ownerStatText}>{book.owner.distance}</Text>
                </View>
              </View>
              <View style={styles.ownerMeta}>
                <Text style={styles.ownerMetaText}>{book.owner.totalBooks} books</Text>
                <Text style={styles.ownerMetaText}>•</Text>
                <Text style={styles.ownerMetaText}>Joined {book.owner.joinedDate}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Bottom Button */}
      {book.available && (
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.rentButton} onPress={handleRent}>
            <Ionicons name="calendar-outline" size={20} color="#fff" />
            <Text style={styles.rentButtonText}>Rent This Book</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  coverContainer: {
    alignSelf: 'center',
    width: 220,
    aspectRatio: 3 / 4,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  rentedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rentedBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  rentedText: {
    fontWeight: '600',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  available: {
    backgroundColor: '#dcfce7',
  },
  rented: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 14,
  },
  availableText: {
    color: '#15803d',
  },
  rentedStatusText: {
    color: '#991b1b',
  },
  priceCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  priceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  priceInfo: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  priceUnit: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  detailItem: {
    width: '50%',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '500',
  },
  ownerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  ownerInfo: {
    flexDirection: 'row',
    marginTop: 12,
  },
  ownerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  ownerInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  ownerDetails: {
    flex: 1,
  },
  ownerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ownerStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  ownerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ownerStatText: {
    fontSize: 14,
    color: '#666',
  },
  ownerMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  ownerMetaText: {
    fontSize: 14,
    color: '#666',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 24,
  },
  rentButton: {
    flexDirection: 'row',
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  rentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});