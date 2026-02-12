import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_RENTALS = [
  {
    id: '1',
    book: {
      title: 'The Midnight Library',
      author: 'Matt Haig',
      cover: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf',
    },
    owner: {
      name: 'Sarah Johnson',
      distance: '0.5 mi',
    },
    rentedDate: 'Jan 26, 2026',
    dueDate: 'Feb 9, 2026',
    status: 'active',
    price: 6,
  },
  {
    id: '2',
    book: {
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: 'https://images.unsplash.com/photo-1670523798656-eda0ea506db6',
    },
    owner: {
      name: 'Michael Chen',
      distance: '1.2 mi',
    },
    rentedDate: 'Jan 15, 2026',
    dueDate: 'Jan 29, 2026',
    status: 'returned',
    price: 5,
  },
];

export default function MyRentals({ navigation }) {
  const activeRentals = MOCK_RENTALS.filter(r => r.status === 'active' || r.status === 'overdue');
  const pastRentals = MOCK_RENTALS.filter(r => r.status === 'returned');

  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderActiveRental = (rental) => {
    const daysLeft = getDaysUntilDue(rental.dueDate);
    const isOverdue = daysLeft < 0;

    return (
      <View key={rental.id} style={styles.rentalCard}>
        <View style={styles.rentalContent}>
          <View style={styles.bookCover}>
            <Image source={{ uri: rental.book.cover }} style={styles.coverImage} />
          </View>
          <View style={styles.rentalInfo}>
            <Text style={styles.bookTitle}>{rental.book.title}</Text>
            <Text style={styles.bookAuthor}>{rental.book.author}</Text>
            <View style={styles.rentalMeta}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.metaText}>
                {rental.owner.name} • {rental.owner.distance}
              </Text>
            </View>
            <View style={styles.rentalMeta}>
              <Ionicons name="calendar-outline" size={14} color="#666" />
              <Text style={styles.metaText}>Rented: {rental.rentedDate}</Text>
            </View>
          </View>
        </View>

        <View style={[
          styles.dueSection,
          isOverdue ? styles.overdue : daysLeft <= 3 ? styles.warning : styles.good
        ]}>
          <View style={styles.dueInfo}>
            <Ionicons 
              name="time-outline" 
              size={16} 
              color={isOverdue ? '#dc2626' : daysLeft <= 3 ? '#ea580c' : '#16a34a'} 
            />
            <Text style={[
              styles.dueText,
              isOverdue ? styles.overdueText : daysLeft <= 3 ? styles.warningText : styles.goodText
            ]}>
              {isOverdue ? `Overdue by ${Math.abs(daysLeft)} days` : `Due in ${daysLeft} days`}
            </Text>
          </View>
          <TouchableOpacity style={[
            styles.returnButton,
            (isOverdue || daysLeft <= 3) && styles.returnButtonUrgent
          ]}>
            <Text style={styles.returnButtonText}>Return Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderPastRental = (rental) => (
    <View key={rental.id} style={styles.pastRentalCard}>
      <View style={styles.pastBookCover}>
        <Image source={{ uri: rental.book.cover }} style={styles.coverImage} />
      </View>
      <View style={styles.pastRentalInfo}>
        <Text style={styles.pastBookTitle}>{rental.book.title}</Text>
        <Text style={styles.bookAuthor}>{rental.book.author}</Text>
        <View style={styles.returnedBadge}>
          <Ionicons name="checkmark-circle" size={16} color="#16a34a" />
          <Text style={styles.returnedText}>Returned</Text>
          <Text style={styles.pastPrice}> • ${rental.price}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Rentals</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Active Rentals */}
        {activeRentals.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Rentals</Text>
            {activeRentals.map(renderActiveRental)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="time-outline" size={32} color="#666" />
            </View>
            <Text style={styles.emptyTitle}>No Active Rentals</Text>
            <Text style={styles.emptyText}>Browse books nearby and start reading</Text>
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Browse Books</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Past Rentals */}
        {pastRentals.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Past Rentals</Text>
            {pastRentals.map(renderPastRental)}
          </View>
        )}

        {/* Tips */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>📚 Reading Tip</Text>
          <Text style={styles.tipText}>
            Return books on time to maintain a good reader rating and get priority access to popular books!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  rentalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    marginBottom: 16,
  },
  rentalContent: {
    flexDirection: 'row',
    padding: 16,
  },
  bookCover: {
    width: 80,
    height: 112,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    marginRight: 16,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  rentalInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  rentalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  dueSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  overdue: {
    backgroundColor: '#fef2f2',
    borderTopColor: '#fecaca',
  },
  warning: {
    backgroundColor: '#fff7ed',
    borderTopColor: '#fed7aa',
  },
  good: {
    backgroundColor: '#f0fdf4',
    borderTopColor: '#bbf7d0',
  },
  dueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dueText: {
    fontSize: 14,
  },
  overdueText: {
    color: '#dc2626',
    fontWeight: '600',
  },
  warningText: {
    color: '#ea580c',
    fontWeight: '600',
  },
  goodText: {
    color: '#16a34a',
    fontWeight: '600',
  },
  returnButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  returnButtonUrgent: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  returnButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 48,
    alignItems: 'center',
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  pastRentalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    flexDirection: 'row',
    marginBottom: 12,
    opacity: 0.75,
  },
  pastBookCover: {
    width: 64,
    height: 96,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    marginRight: 16,
  },
  pastRentalInfo: {
    flex: 1,
  },
  pastBookTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  returnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  returnedText: {
    fontSize: 14,
    color: '#16a34a',
  },
  pastPrice: {
    fontSize: 14,
    color: '#666',
  },
  tipCard: {
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#93c5fd',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});